import React from 'react'
import loading from './loading.module.css'

interface LoadingBoxProps {
  isLoading: boolean;
  rows: number;
}

function LoadingBox({isLoading, rows}: LoadingBoxProps) {
  const lightsPerRow = 15;

  return (
    <div className={loading.container}>
        { // the array is empty - _a points to empty array slots and is not used
        [...Array(rows * lightsPerRow)].map((_a, i) =>
            <div key={i} className={isLoading ? loading.lightOn : loading.lightOff} style={{animationDelay: `${i * 6}0ms`}}></div>
        )}
    </div>
  )
}

export default LoadingBox