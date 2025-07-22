"use client"

import { useCallback } from "react"

interface ClientInteractionsProps {
  children: (handlers: {
    handleAppDownload: () => void
    handleRepoInstall: () => void
    copyRepoUrl: () => void
    scrollToSection: (sectionId: string) => void
    openExternalLink: (url: string) => void
    handleNewsletterSubmit: (email: string) => void
  }) => React.ReactNode
}

export default function ClientInteractions({ children }: ClientInteractionsProps) {
  const handleAppDownload = useCallback(() => {
    window.open("https://cloudstream-apk.com/wp-content/uploads/2025/04/4.5.2_(cloudstream-apk.com).apk", "_blank")
  }, [])

  const handleRepoInstall = useCallback(() => {
    window.location.href = "cloudstreamrepo://raw.githubusercontent.com/nehalDIU/nehal-CloudStream/master/repo.json"
  }, [])

  const copyRepoUrl = useCallback(() => {
    navigator.clipboard.writeText("https://raw.githubusercontent.com/nehalDIU/nehal-CloudStream/builds/plugins.json")
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const openExternalLink = useCallback((url: string) => {
    window.open(url, "_blank")
  }, [])

  const handleNewsletterSubmit = useCallback((email: string) => {
    if (email) {
      alert("Thank you for subscribing! We'll keep you updated.")
      return true
    }
    return false
  }, [])

  return (
    <>
      {children({
        handleAppDownload,
        handleRepoInstall,
        copyRepoUrl,
        scrollToSection,
        openExternalLink,
        handleNewsletterSubmit
      })}
    </>
  )
}
