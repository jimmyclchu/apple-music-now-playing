import { useState, useEffect } from "react";
import { UseConnectReturn, Size, Color, FileType } from "../types";

interface ConnectionResponse {
  success: boolean;
  message?: string;
  connectionId?: string;
}

export function useConnect(): UseConnectReturn {
  const [activeSize, setActiveSize] = useState<Size>(Size.Banner);
  const [activeColor, setActiveColor] = useState<Color>(Color.Light);
  const [activeFileType, setActiveFileType] = useState<FileType>(FileType.SVG);
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [connectionId, setConnectionId] = useState<string>("*********");
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  const baseURL = currentUrl;
  
  const apiEndpoint = `${baseURL}/w/${connectionId}`;
  const curlCommand = `curl ${baseURL}/api/connection/${connectionId}/recent-played
  `;
  const apiResponse = `{
    "next": "/v1/me/recent/played?offset=1",
    "data": [
        {
            "id": "1665303755",
            "type": "albums",
            "href": "/v1/catalog/ca/albums/1665303755",
            "attributes": {
                "copyright": "℗ 2023 Pink Floyd Music Ltd., marketed and distributed by Sony Music Entertainment",
                "genreNames": [
                    "Rock",
                    "Music",
                    "Hard Rock",
                    "Arena Rock",
                    "Psychedelic",
                    "Prog-Rock/Art Rock"
                ],
                "releaseDate": "1973-03-01",
                "isMasteredForItunes": true,
                "upc": "196589805232",
                "artwork": {
                    "width": 4167,
                    "height": 4167,
                    "url": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/de/e1/22/dee122e8-c9b6-9d06-185b-9a665c5e5f52/196589805232.jpg/{w}x{h}bb.jpg",
                    "bgColor": "090b0a",
                    "textColor1": "f4f4f6",
                    "textColor2": "f28229",
                    "textColor3": "c5c6c7",
                    "textColor4": "c36a23"
                },
                "playParams": {
                    "id": "1665303755",
                    "kind": "album"
                },
                "url": "https://music.apple.com/ca/album/the-dark-side-of-the-moon-50th-anniversary-remastered/1665303755",
                "recordLabel": "Legacy Recordings",
                "trackCount": 10,
                "isCompilation": false,
                "isSingle": false,
                "name": "The Dark Side of the Moon (50th Anniversary) [Remastered]",
                "artistName": "Pink Floyd",
                "contentRating": "explicit",
                "editorialNotes": {
                    "tagline": "Featured in 100 Best Albums",
                    "standard": "<b>100 Best Albums</b> <I>The Dark Side of the Moon</I> is a little like puberty: Feel how you want about it, but you're gonna have to encounter it one way or another. Developed as a suite-like journey through the nature of human experience, the album not only set a new bar for rock music's ambitions, but it also proved that suite-like journeys through the nature of human experience could actually make their way to the marketplace—a turn that helped reshape our understanding of what commercial music was and could be.<br />\nIf pop—even in the post-Beatles era—tended toward lightness and salability, <I>Dark Side</I> was dense and boldfaced; if pop was telescoped into bite sizes, <I>Dark Side</I> was shaped more like a novel or an opera, each track flowing into the next, bookended by that most nature-of-human-experience sounds, the heartbeat.<br /> \nEven compared to other rock albums of the time, <I>Dark Side</I> was a shift, forgoing the boozy extroversion of stuff like The Rolling Stones for something more interior, private, less fun but arguably more significant. In other words, if <I>Led Zeppelin IV</I> was something you could take out, <I>Dark Side</I> was strictly for going in. That the sound was even bigger and more dramatic than Zeppelin's only bolstered the band's philosophical point: What topography could be bigger and more dramatic than the human spirit?<br />\nAs much as the album marked a breakthrough, it was also part of a progression in which Floyd managed to join their shaggiest, most experimental phase (<I>Atom Heart Mother</I>, <I>Meddle</I>) with an emerging sense of clarity and critical edge, exploring big themes—greed ("Money"), madness ("Brain Damage," "Eclipse"), war, and societal fraction ("Us and Them")—with a concision that made the message easy to understand no matter how far out the music got. Drummer Nick Mason later noted that it was the first time they'd felt good enough about their lyrics—written this time entirely by Roger Waters—to print them on the album sleeve.<br />\nFor one of the most prominent albums in rock history, <I>Dark Side</I> is interestingly light on rocking. The cool jazz of Rick Wright's electric piano, the well-documented collages of synthesizer and spoken word, the tactility of ambient music and dub—even when the band opened up and let it rip (say, "Any Colour You Like" or the ecstatic wail of "The Great Gig in the Sky"), the emphasis was more on texture and feel than the alchemy of musicians in a room.<br /> \nYes, the album set a precedent for arty, post-psychedelic voyagers like <I>OK Computer</I>-era Radiohead and Tame Impala, but it also marked a moment when rock music fused fully with electronic sound, a hybrid still vibrant more than five decades on. The journey here was ancient, but the sound was from the future.",
                    "short": "A psychedelic epic fully fusing rock music with electronic sound."
                },
                "isComplete": true
            }
        }
    ]
}`;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const music = window.MusicKit.getInstance();
      const userToken = music.musicUserToken;

      const response = await fetch(`/api/connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: userToken,
          turnstileToken: 'sdfj53evJ_m6',
        })
      });
      
      const data = await response.json() as ConnectionResponse;
      
      if (response.ok && data.connectionId) {
        setConnectionId(data.connectionId);
        setResponse("Connected successfully!");
      } else {
        setResponse(`Connection failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setResponse("Connection failed: Network error");
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
      setShowForm(false);
    }
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedSize = sessionStorage.getItem('activeSize');
    const savedColor = sessionStorage.getItem('activeColor');
    const savedFileType = sessionStorage.getItem('activeFileType');

    if (savedSize) setActiveSize(savedSize as Size);
    if (savedColor) setActiveColor(savedColor as Color);
    if (savedFileType) setActiveFileType(savedFileType as FileType);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    sessionStorage.setItem('activeSize', activeSize);
  }, [activeSize]);

  useEffect(() => {
    sessionStorage.setItem('activeColor', activeColor);
  }, [activeColor]);

  useEffect(() => {
    sessionStorage.setItem('activeFileType', activeFileType);
  }, [activeFileType]);

  return {
    activeSize,
    activeColor,
    activeFileType,
    showForm,
    inputValue,
    isLoading,
    response,
    apiEndpoint,
    curlCommand,
    apiResponse,
    connectionId,
    setActiveSize,
    setActiveColor,
    setActiveFileType,
    setInputValue,
    handleConnect,
  };
}
