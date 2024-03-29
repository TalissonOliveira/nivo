import { FormEvent, useState } from 'react'
import { LucideFileDown, LucideFilter, LucideMoreHorizontal, LucidePlus, LucideSearch } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Pagination } from './components/pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export interface TagsResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  const [filter, setFilter] = useState(urlFilter)
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: tagsResponse, isLoading } = useQuery<TagsResponse>({
    queryKey: ['get-tags', page, urlFilter],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`)
      const data = await response.json()
      return data
    },
    placeholderData: keepPreviousData
  })

  function handleFilter(event: FormEvent) {
    event.preventDefault()
    const formattedFilter = filter.charAt(0).toUpperCase() + filter.slice(1)

    setSearchParams(params => {
      params.set('page', '1')
      params.set('filter', formattedFilter)

      return params
    })
  }

  if (isLoading) {
    return null
  }

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
          <form onSubmit={handleFilter} className="flex items-center gap-3">
            <Input variant='filter'>
              <LucideSearch className="size-3" />
              <Control
                placeholder="Search tags..."
                onChange={e => setFilter(e.target.value)}
                value={filter}
              />
            </Input>
            <Button type="submit">
              <LucideFilter className="size-3" />
              Filter
            </Button>
          </form>

          <Button>
            <LucideFileDown className="size-3" />
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
            {tagsResponse?.data.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{tag.title}</span>
                    <span className="text-xs text-zinc-500">{tag.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">
                  {tag.amountOfVideos} video(s)
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

        {tagsResponse && (
          <Pagination
            pages={tagsResponse.pages}
            items={tagsResponse.items}
            page={page}
          />
        )}
      </main>
    </div>
  )
}

