import React, { useState } from 'react';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data);
    setIsSubmitted(true); // Show success message after form is submitted
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="success-message">
          <p>Thank you! Your message has been successfully submitted.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is Required' })}
          />
          <p className="errors">{errors.name?.message}</p>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is Required',
              validate: (value) =>
                validator.isEmail(value) || 'Invalid email format',
            })}
          />
          <p className="errors">{errors.email?.message}</p>

          <label htmlFor="message">Message</label>
          <input
            type="text"
            id="message"
            {...register('message', { required: 'Message is Required' })}
          />
          <p className="errors">{errors.message?.message}</p>

          <button id="submit">Submit</button>
        </form>
      )}
      <DevTool control={control} />
    </div>
  );
};
