import { headers } from "next/headers";

async function handler(request:Request){
const payload=await request.json()
const headerList=headers()
}

export const GET =handler;
export const POST =handler;
export const PUT =handler;
