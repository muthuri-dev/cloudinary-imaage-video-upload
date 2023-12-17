"use client"
import styles from './page.module.css'
import Image from "next/image";
import {useForm} from "react-hook-form";
import React,{useState} from "react";

export default function Home() {
    const {register, handleSubmit}= useForm();
    const [image, setImage] = useState<string | undefined>();
    const onSubmit = async(data:any)=>{
        const image = data.profile[0];
        const formData = new FormData();
        formData.append('file',image);
        formData.append('upload_preset','testing')
        console.log(formData);
        //upload endpoint
        const uploadResponse:Response = await fetch("https://api.cloudinary.com/v1_1/dhwehpegh/image/upload",{
            method:"POST",
            body: formData
        });
        const response = await uploadResponse.json();
        const imageUrl:string = response.secure_url;
        console.log(imageUrl);
        setImage(imageUrl);
    }
  return (
    <main className={styles.main}>
      <h3>Upload image to cloudinary</h3>
        <Image src="https://res.cloudinary.com/dhwehpegh/image/upload/c_thumb,w_200,g_face/v1702755292/samples/people/smiling-man.jpg" width={150} height={150} alt="image"/>
        <hr/>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("profile")} aria-describedby="file_input_help"/>
                <button>Upload</button>
            </form>
            {
                image &&(
                    <Image src={image} alt="image" width={250} height={250}/>
                )
            }
    </div>
    </main>
  )
}
