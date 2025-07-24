import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID , Query } from "appwrite";




export const createUserAccount = async(user:INewUser) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      ) 
      if(!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(user.name);

      const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        email: newAccount.email,
        name: newAccount.name,
        username: user.username,
        imageUrl: avatarUrl,
      })
      return newUser;
    } catch (error) {
       console.error("Error creating user account:", error);
       return error;
    }
}


export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: string;
    username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}



export const SignInAccount = async( user: { email:string, password:string }) => {
  try {
   
    const session = await account.createEmailPasswordSession(user.email, user.password);

    if(!session) throw Error;
    
    console.log("Session created:", session);
    return session;
  } catch (error) {
    console.error("Error signing in user:", error);
    return error;
    
  }
}


export const getCurrentUser = async() => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    )

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export const SignOutAccount = async() => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log("Error signing out user:", error);
    return error;
  }
}