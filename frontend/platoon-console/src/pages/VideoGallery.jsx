import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

Modal.setAppElement('#root');  // for screen readers

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const fetchPlaylistVideos = async () => {
    const API_KEY = import.meta.env.VITE_REACT_APP_YT_API_KEY;
    const playlistId = import.meta.env.VITE_REACT_APP_YT_WHISKEY_PLAYLIST_ID;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=25`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const videoItems = data.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url // high quality thumbnails
      }));
      setVideos(videoItems);
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  useEffect(() => {
    fetchPlaylistVideos();
  }, []);

  const openModal = (videoId) => {
    setSelectedVideoId(videoId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <h1>Playlist Videos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {videos.map(video => (
          <div key={video.id} onClick={() => openModal(video.id)} style={{ cursor: 'pointer' }}>
            <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: 'auto' }} />
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}>
        {selectedVideoId && <YouTube videoId={selectedVideoId} opts={opts} />}
      </Modal>
    </div>
  );
};

export default VideoGallery;
