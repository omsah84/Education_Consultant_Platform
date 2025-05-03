import React from 'react'
import HostOnboardingPage from '@/components/HostOnboardingPage'
import Header from '@/components/HomeHeader'
import Footer from '@/components/HomeFooter'
export default function page() {
  return (
    <div>
      <Header/>
      <HostOnboardingPage/>
      <Footer/>
    </div>
  )
}
