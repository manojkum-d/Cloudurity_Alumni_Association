import client from "@/lib/appwrite_client";
import { Databases} from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//fetch a specific Alumni

async function fetchAlumni(id:string) {
    try {
        const alumni = await database.getDocument(
           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,"6658b3c20028949ba339", id);
            return alumni
    } catch (error) {
        console.error('Error fetching alumni',error);
        throw new Error ("Failed to fetch Alumni")
    }
}

//delete a Alumni
async function deleteAlumni(id: string){
    try {
        const response = await database.deleteDocument( process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,"6658b3c20028949ba339", id)
        return response;
    } catch (error) {
        console.error('Error deleting alumni',error);
        throw new Error ("Failed to deleting Alumni")
    }
}

//delete a Alumni
async function updateAlumni(id: string,data:{
    name: string;
    dob: String;
    email: string;
    department:string,
    yearofpassed: number;
    specialization: string;
    extracurricular: string[];
    cocurricular: string[];
    phoneno: string;
    img:string
}){
    try {
        const response = await database.updateDocument( process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,"6658b3c20028949ba339", id,data)
        return response;
    } catch (error) {
        console.error('Error deleting alumni',error);
        throw new Error ("Failed to deleting Alumni")
    }
}

export async function GET(req:Request,{params}:{params:{id:string}}){
    try {
        const id=params.id;
        const alumni = await fetchAlumni(id);
        return NextResponse.json({alumni});
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to fetch interpretation"},
            {status:500}
        );
    }
}
export async function DELETE(req:Request,{params}:{params:{id:string}}){
    try {
        const id=params.id;
        await deleteAlumni(id);
        return NextResponse.json({message:"Alumni deleted"});
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to delete interpretation"},
            {status:500}
        );
    }
}
export async function PUT(req:Request,{params}:{params:{id:string}}){
    try {
        const id=params.id;
        const alumni=await req.json();
        await updateAlumni(id,alumni);
      
        return NextResponse.json({message:"Alumni Updated"});
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to update interpretation"},
            {status:500}
        );
    }
}