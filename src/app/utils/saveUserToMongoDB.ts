import { connectToDB } from '@/lib/mongodb';

export const saveUserToMongoDB = (user: any)=>{
 connectToDB('post', user, 'LoginData', null);
}