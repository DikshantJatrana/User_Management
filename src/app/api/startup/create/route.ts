import StartupModel from "@/model/Startup";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const user = formData.get("user") as string;
    const logoFile = formData.get("logo") as File;
    const coverImageFile = formData.get("coverImage") as File;

    if (!title || !description || !user || !logoFile || !coverImageFile) {
      return NextResponse.json({ error: "Invalid Details" }, { status: 400 });
    }

    const uploadToCloudinary = async (file: File) => {
      return await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
    };

    const logoUploadResult = await uploadToCloudinary(logoFile);
    const coverImageUploadResult = await uploadToCloudinary(coverImageFile);

    if (!logoUploadResult || !coverImageUploadResult) {
      return NextResponse.json(
        { error: "Failed to upload images" },
        { status: 500 }
      );
    }

    const logoUrl = (logoUploadResult as any).secure_url;
    const coverImageUrl = (coverImageUploadResult as any).secure_url;
    const slug = slugify(title, { lower: true, strict: true });

    const startup = await StartupModel.create({
      title,
      slug,
      logo: logoUrl,
      coverImage: coverImageUrl,
      description,
      admin: [user],
    });

    return NextResponse.json(
      { msg: "Startup Created", startup },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in startup creation API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
