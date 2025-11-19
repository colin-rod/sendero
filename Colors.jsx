import React from 'react';

export default function Colors() {
  return (
    <div 
      style={{
        backgroundColor: '#494949',
        borderRadius: '16px',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '206px'
      }}
      data-name="Colors"
      data-node-id="5:7"
    >
      {/* Primary */}
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#e2b71f',
          left: '49px',
          top: '73px',
          width: '60px',
          height: '60px',
          borderRadius: '12px'
        }}
        data-name="Primary"
        data-node-id="5:8"
      />
      
      {/* Secondary */}
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#fff0bb',
          left: '157px',
          top: '73px',
          width: '60px',
          height: '60px',
          borderRadius: '12px'
        }}
        data-name="Secondary"
        data-node-id="5:17"
      />
      
      {/* Gravel Black */}
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#1b1b1b',
          left: '265px',
          top: '73px',
          width: '60px',
          height: '60px',
          borderRadius: '12px'
        }}
        data-name="Gravel Black"
        data-node-id="5:13"
      />
      
      {/* Steel Gray */}
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#616161',
          left: '373px',
          top: '73px',
          width: '60px',
          height: '60px',
          borderRadius: '12px'
        }}
        data-name="Steel Gray"
        data-node-id="5:15"
      />
      
      {/* White */}
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#ffffff',
          left: '481px',
          top: '73px',
          width: '60px',
          height: '60px',
          borderRadius: '12px'
        }}
        data-name="White"
        data-node-id="5:14"
      />
      
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#f1f1f1',
          left: '589px',
          top: '73px',
          width: '60px',
          height: '60px',
          borderRadius: '12px'
        }}
        data-name="BCK"
        data-node-id="5:16"
      />
    </div>
  );
}
