'use client'
import React, { useEffect, useState } from 'react';
import { Alumni } from "@/app/alumni_list/columns";
import TableUi from '@/components/ui/TableUi';
import { Card, Skeleton } from "@nextui-org/react";

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
        setAlumni(data.alumni);
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
          <div className='container'>
            <Card className="w-[100%] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">  
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
            {/* You can add more SkeletonCards as needed */}
          </div>
        ) : (
          alumni && <TableUi alumni={alumni} />
        )}
      </div>
    </section>
  );
}

export default AlumniList;
