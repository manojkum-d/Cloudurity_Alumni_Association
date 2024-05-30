
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuRadioItem, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationEllipsis, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination"

export default function Search() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-zinc-950 text-white">
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-zinc-800 text-white"
                placeholder="Search students..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <FilterIcon className="w-5 h-5 text-gray-400" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-950 text-white">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Computer Science</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Electrical Engineering</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Mechanical Engineering</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Business Administration</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Civil Engineering</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Biology</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Computer Engineering</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Psychology</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>2023</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2022</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2021</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2020</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2019</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2018</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2017</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>2016</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <ListOrderedIcon className="w-5 h-5 text-gray-400" />
                <span className="sr-only">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-950 text-white">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="name">
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="major">Major</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="year">Year</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="rounded-full" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold mb-4">All Students</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-zinc-800">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Major</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    John Doe
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Computer Science</td>
                <td className="px-4 py-3 text-sm">2023</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    Jane Smith
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Electrical Engineering</td>
                <td className="px-4 py-3 text-sm">2022</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    Michael Johnson
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Mechanical Engineering</td>
                <td className="px-4 py-3 text-sm">2021</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    Emily Davis
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Business Administration</td>
                <td className="px-4 py-3 text-sm">2020</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    David Lee
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Civil Engineering</td>
                <td className="px-4 py-3 text-sm">2019</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    Sarah Kim
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Biology</td>
                <td className="px-4 py-3 text-sm">2018</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    Alex Nguyen
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Computer Engineering</td>
                <td className="px-4 py-3 text-sm">2017</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="px-4 py-3 text-sm">
                  <Link className="text-white hover:underline" href="#">
                    Olivia Hernandez
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">Psychology</td>
                <td className="px-4 py-3 text-sm">2016</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="text-black" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="text-black" href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="text-black" href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="text-black" href="#">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="text-black" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="text-black" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  )
}

function FilterIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListOrderedIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}


function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}