import StartupModel from "@/model/Startup";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const user = formData.get("user") as string;
    const logoFile = formData.get("logo") as File | null;
    const coverImageFile = formData.get("coverImage") as File | null;
    const sharePrice = formData.get("sharePrice") as string;
    const shareQuantity = formData.get("shareQuantity") as string;
    const details = formData.get("details") as string;

    if (
      !title ||
      !description ||
      !user ||
      !sharePrice ||
      !shareQuantity ||
      !details
    ) {
      return NextResponse.json({ error: "Invalid Details" }, { status: 400 });
    }

    const existingStartup = await StartupModel.findById(id);

    if (!existingStartup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    if (!existingStartup.admin.includes(user)) {
      return NextResponse.json(
        { error: "Unauthorized to update this startup" },
        { status: 403 }
      );
    }

    const uploadToCloudinary = async (file: File) => {
      return await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
    };

    if (logoFile) {
      const logoUploadResult = await uploadToCloudinary(logoFile);
      if (!logoUploadResult) {
        return NextResponse.json(
          { error: "Failed to upload logo" },
          { status: 500 }
        );
      }
      existingStartup.logo = (logoUploadResult as any).secure_url;
    }

    if (coverImageFile) {
      const coverImageUploadResult = await uploadToCloudinary(coverImageFile);
      if (!coverImageUploadResult) {
        return NextResponse.json(
          { error: "Failed to upload cover image" },
          { status: 500 }
        );
      }
      existingStartup.coverImage = (coverImageUploadResult as any).secure_url;
    }

    existingStartup.title = title;
    existingStartup.description = description;
    existingStartup.slug = slugify(title, { lower: true, strict: true });
    existingStartup.sharePrice = parseFloat(sharePrice);
    existingStartup.shareQuantity = parseInt(shareQuantity, 10);
    existingStartup.details = details;

    const updatedStartup = await existingStartup.save();

    return NextResponse.json(
      { msg: "Startup Updated", startup: updatedStartup },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in startup update API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
