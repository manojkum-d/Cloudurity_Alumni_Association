import { useState } from "react";
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

const AddNewAlu = () => {
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
            {/* Form fields */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNewAlu;
