import { useQuery, useQueryClient } from "@tanstack/react-query"
import { setCookie } from "cookies-next"
import { useEffect } from "react"
import { queryKey } from "src/constants/queryKey"

type Scheme = "light" | "dark"
type SetScheme = (scheme: Scheme) => void

const useScheme = (): [Scheme, SetScheme] => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKey.scheme(),
    enabled: false,
    initialData: "light", // Set initial data to light
  })

  const scheme = "light" // Always use light theme

  const setScheme = (scheme: "light" | "dark") => {
    setCookie("scheme", "light") // Always set cookie to light
    queryClient.setQueryData(queryKey.scheme(), "light") // Always set query data to light
  }

  useEffect(() => {
    setScheme("light") // On component mount, enforce light theme
  }, [])

  return [scheme, setScheme]
}

export default useScheme
