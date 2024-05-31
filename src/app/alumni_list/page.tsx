'use client';
import TableUi from '@/components/ui/TableUi';
import React, { useEffect, useState } from 'react';
import { Alumni } from "@/app/alumni_list/columns";

type Props = {}

const AlumniList: React.FC<Props> = () => {
  const [alumni, setAlumni] = useState<Alumni[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('/api/alumni_list');
        if (!response.ok) {
          throw new Error("Failed to fetch Alumni");
        }
        const data = await response.json();
        // console.log(data);
        setAlumni(data.alumni); // Accessing the alumni array within the response
      } catch (error) {
        console.log("Error:", error);
        setError("Failed to load alumni. Please try reloading the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <section className='py-24'>
        <div className='container'>
      {error && <p className='py-4 text-red-500'>{error}</p>}
      {isLoading ? (
          <p>Loading...</p>
        ) : (
            alumni && <TableUi alumni={alumni} />
        )}
        </div>
    </section>
  );
}

export default AlumniList;
