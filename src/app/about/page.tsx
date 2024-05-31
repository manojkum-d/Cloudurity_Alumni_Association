import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
// import { Icons } from '@/components/icons';

const AboutSection = () => {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="max-w-md">
        <CardHeader>
          <Avatar>
            <AvatarImage src="logoo.png" alt="Avatar" className='' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Manoj Kuamr d</h3>
              <p className="text-sm text-muted-foreground">Full Stack Developer</p>
            </div>
            <CardDescription>
              I'm a passionate full stack developer with expertise in React, Node.js, and modern web technologies. I love building intuitive and visually appealing user interfaces while ensuring robust and scalable backend architectures.
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline">
            {/* <Icons.gitHub className="h-5 w-5" /> */}
            GitHub
          </a>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AboutSection;