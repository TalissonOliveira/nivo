import { LucideFileDown, LucideMoreHorizontal, LucidePlus, LucideSearch } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Pagination } from './components/pagination'

export function App() {
  return (
    <div className="py-4 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>

      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant="primary">
            <LucidePlus className="size-3" />
            Create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input variant='filter'>
            <LucideSearch className="size-3" />
            <Control placeholder="Search tags..." />
          </Input>

          <Button>
            <LucideFileDown />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableHead></TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Amount of videos</TableHead>
            <TableHead></TableHead>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">React</span>
                    <span className="text-xs text-zinc-500">01518E42-4D55-4390-A2E7-278C83332EA3</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">
                  13 video(s)
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon">
                    <LucideMoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination />
      </main>
    </div>
  )
}

