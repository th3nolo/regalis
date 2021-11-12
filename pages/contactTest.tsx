import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Head from 'next/head'
import styles from "../src/styles/contact.module.css";
import { useState } from "react";
import axios from "axios"


export default function ContactTest() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const {register, handleSubmit, formState: { errors }} = useForm();
  //console.log(errors);

  const onSubmitForm = (e:any) => { 
    // e.preventDefault()
    console.log('Sending')
  let data = {
      name,
      email,
      message
    }
  fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        //console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setMessage('')
      }
    })

    document.getElementsByTagName('input')[0].value = "";
    document.getElementsByTagName('input')[1].value = "";
    document.getElementsByTagName('textarea')[0].value = "";
  }

//  async function onSubmitForm (values:any) {
//     let config = {
//       method: 'post',
//       url: '/api/contact',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: values
//     };
//     const response = await axios(config);
//     console.log(response)
//   }
  
  
return (
  <div>
    <div>
      <h1 className={styles.center} >Christmas gifts season</h1>
    </div>
    <br />

    <div className={styles.container}>

      < form className={styles.main} onSubmit={handleSubmit(onSubmitForm)}>

      < div className={styles.inputGroup} >
        < label htmlFor='name' className={styles.label}>Name:</label>
        < input type='text' id="name" 
        {...register("name", {
            required: "You must enter your Name",
            minLength: {
              value: 3,
              message: "This name is too short",
            },
            maxLength: {
              value: 30,
              message: "This name is too long"
            }
          })}
        placeholder="Your name" autoComplete="off" autoFocus onChange={(e)=>{setName(e.target.value)}} 
        name='name' className={styles.inputField} /> 
        <span className={styles.span}>{errors?.name?.message}</span>
      </div>
      < div className={styles.inputGroup} >
        < label htmlFor='email' className={styles.label}>Email:</label>
        < input type='text' id="email" 
        {...register("email", {
          required: "You must input your email",
          minLength: {
            value: 6,
            message: "This email is too short"
          },
          maxLength: {
            value: 100,
            message: "This email is too long"
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })} placeholder="example@email.com" autoComplete="off"  onChange={(e)=>{setEmail(e.target.value)}}
         name='email' className={styles.inputField} />

         <span className={styles.span}>{errors?.email?.message}</span>
      </div>
      < div className={styles.inputGroup} >
        < label htmlFor='message' className={styles.label}>Message:</label>
        < textarea  id="message" 
        {...register("message", {
          required: "You must input your message",
          minLength: {
            value: 10,
            message: "Message must be at least 10 characters"
          },
          maxLength: {
            value: 120,
            message: "Message cannot be longer than 120 characters"
          }

        })} placeholder="Example Message" autoComplete="off" minLength={20} onChange={(e)=>{setMessage(e.target.value)}}
         name='message' className={styles.textArea} />
         <span className={styles.span}>{errors?.message?.message}</span>
      </div>

      <input type="submit" value="send" className={styles.send} />

      </form >
      <br />
      <br />
        <div className={styles.center}>
        <Link href="/">Home</Link>
        </div>
    </div>
</div>

)
  
  
};
