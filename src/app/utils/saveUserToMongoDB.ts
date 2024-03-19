import { connectToDB } from '@/lib/mongodb';

export const saveUserToMongoDB = async (user: any)=>{
  await connectToDB('post', user, 'LoginData', null);
}