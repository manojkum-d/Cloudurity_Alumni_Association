"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@nextui-org/react";
import { useState } from "react";

const addNewAlu = () => {
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    yearOfPassed: z.string().optional(),
    department: z.string().min(2, { message: "Department must be at least 2 characters." }),
    specialization: z.string().min(2, { message: "Specialization must be at least 2 characters." }),
    cocurricular: z.string().optional(),
    phoneNumber: z.string().optional(),
    extracurricular: z.string().optional(),
    dateOfBirth: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      yearOfPassed: undefined,
      department: "",
      specialization: "",
      cocurricular: "",
      phoneNumber: "",
      extracurricular: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { name, dateOfBirth, email, yearOfPassed, department, specialization, extracurricular, cocurricular, phoneNumber } = data;
    const requestData = {
      name,
      dob: dateOfBirth,
      email,
      yearofpassed: Number(yearOfPassed), // Ensure yearOfPassed is a number
      department, // Include department in the request
      specialization,
      extracurricular: extracurricular ? [extracurricular] : [],
      cocurricular: cocurricular ? [cocurricular] : [],
      phoneno: phoneNumber,
      image: "", // Add logic to handle image upload if necessary
    };

    try {
      const response = await fetch('/api/alumni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to create Alumni');
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-600 p-8 rounded-lg shadow-md mt-9">
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl mb-2">Add new Alumni</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearOfPassed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Passed</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter year of passed" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter the year you passed.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your department.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter specialization" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your specialization.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cocurricular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Co-curricular Activities</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter co-curricular activities" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your co-curricular activities.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extracurricular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra-curricular Activities</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter extra-curricular activities" {...field} className="rounded-md" />
                  </FormControl>
                  <FormDescription>Enter your extra-curricular activities.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      
                      className="rounded-md"
                    />
                  </FormControl>
                  <FormDescription>Enter your date of birth.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <Button type="submit" className="w-full rounded-md">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default addNewAlu;
