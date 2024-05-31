import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Home() {

  return (
    <main className="bg-zinc-950">
   <div className="bg-white dark:bg-zinc-950 flex flex-col lg:flex-row items-center">
    <div className="p-10 pb-0 flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-white space-y-5" >
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Alumni Association.<br/>
      </h1>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      Get involved. Stay connected. Give back.
      </h2>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
      The Christ University Alumni Association is more than just a website. It&apos;s a place to reconnect with old friends, reminisce about cherished memories, and forge new connections that will last a lifetime.  We&apos;re here to reignite your school spirit, celebrate your achievements, and empower you to continue your legacy of success.
       Dive in, explore, and rediscover the magic of being a christite! 
      </p>
      
      <Link href='/alumni_list' className="flex cursor-pointer bg-blue-500 p-5 w-fit">
          Connect Now!
          <ArrowRight className="ml-10"/>
          </Link>  
    </div>
    <div className="bg-white dark:bg-Zinc-950 h-full w-auto mx-10 dark:bg-zinc-950">
    <video autoPlay loop muted className="rounded-lg" >
      <source src="vid.mp4" type="video/mp4"/>
      Your Browser does not Support this video tag.
    </video>
    </div>
   </div>
    <div className="flex justify-center items-center bg-white dark:bg-zinc-950">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.555960462645!2d77.60360851184882!3d12.936236187323258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b277a93807%3A0x88518f37b39dabd0!2sChrist%20University!5e0!3m2!1sen!2sin!4v1717068151257!5m2!1sen!2sin"  className="rounded-md justify-center w-full m-3 h-[300px]">
    </iframe>
    </div>
   </main>
  );
}
