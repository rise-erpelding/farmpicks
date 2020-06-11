import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <div className='hero'>
      <Link
        className='hero--farmpicks'
        to='/'
      >
        FarmPicks
  </Link>
      <p>From small farms to you.</p>
    </div>
  )
}
