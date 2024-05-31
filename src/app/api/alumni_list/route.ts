import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";
const database =new Databases(client);

//Create Alumni.

async function createAlumni(data:{
    name: string;
  dob: String;
  email: string;
  yearofpassed: number;
  specialization: string;
  extracurricular: string[];
  cocurricular: string[];
  phoneno: string;
  image:string
}) {
    try {
        const response =await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,"6658b3c20028949ba339", ID.unique(),
    data);
        return response;
    } catch (error) {
        console.log('Error Creating alumni',error);
        throw new Error("Failed to create Alumni")
    }
}

//fetch alumni
async function fetchAlumni() {
    try {
        const response =await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,"6658b3c20028949ba339", 
        [Query.orderDesc("$createdAt")]);
        return response.documents;
    } catch (error) {
        console.log('Error Fetching interpretation',error);
        throw new Error("Failed to fetch Alumni")
    }
}

export async function POST(req:Request){
    try {
            const{name,dob,email,department,yearofpassed,specialization,extracurricular ,cocurricular,phoneno,image} = await req.json();
        const data ={name,dob,email,department,yearofpassed,specialization,extracurricular ,cocurricular,phoneno,image};
        const response = await createAlumni(data);
        return NextResponse.json({message:"Alumni Created"});
    } catch (error) {
       return NextResponse.json(
        {
            error:"Failed to Create Alumni",
        },{status:500}
       ) 
    }
}

export async function GET() {
    try {
            const alumni = await fetchAlumni();
            return NextResponse.json({alumni});
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to fetch Alumni"},
            {status:500}
        );
    }
    
}