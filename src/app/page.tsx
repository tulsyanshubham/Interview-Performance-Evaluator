"use client";
import React from 'react'
import DomainForm from '@/components/DomainForm'
import TopicForm from '@/components/TopicForm'
import { useFormData } from '../context/formData-provider';

export default function Home() {
  const { formData } = useFormData();
  return (
    <div>
      {/* {formData.domain === "" ? <DomainForm /> : <TopicForm />} */}
    </div>
  )
}
