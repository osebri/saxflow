import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';


const MusicSheet = ({ apiUrl }) => {
  const containerRef = useRef(null);
  const [musicXmlContent, setMusicXmlContent] = useState('');
  const osmdRef = useRef(null); // Reference to hold the OSMD instance

  useEffect(() => {
    const fetchMusicXml = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMusicXmlContent('/ode.musicxml'); // Assuming the API returns the MusicXML content
      } catch (error) {
        console.error('Error fetching MusicXML file:', error);
      }
    };

    fetchMusicXml();
  }, [apiUrl]);

  useEffect(() => {
    if (musicXmlContent && containerRef.current) {
      osmdRef.current = new OpenSheetMusicDisplay(containerRef.current, {
        autoResize: true,
        drawTitle: false,
        drawSubtitle: false,
        drawComposer: false,
        drawLyricist: false,
        followCursor: true,
        setWantedStemDirectionByXml: true,
      });

      osmdRef.current.load(musicXmlContent).then(() => {
        osmdRef.current.render();

        // Custom styling after rendering
        customizeStyles(osmdRef.current);
      }).catch(error => {
        console.error('Error loading or rendering MusicXML content:', error);
      });
    }
  }, [musicXmlContent]);

  const customizeStyles = (osmd) => {
    const svg = containerRef.current.querySelector('svg');



    // Change the spacing between notes
    const osmdSpacing = osmd.EngravingRules.StaffHeight * 0.7;
    osmd.EngravingRules.StaffHeight = osmdSpacing;
    osmd.render();
  };

  return <div ref={containerRef} style={{ width: '6000px', height: '100%' }}></div>;
};

export default MusicSheet;
