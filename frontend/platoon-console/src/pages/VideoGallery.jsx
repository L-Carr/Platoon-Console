import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import YouTube from "react-youtube"; // Import YouTube component to display YouTube videos
import { Button } from "reactstrap";

const VideoGallery = () => {
  // State vars for videos, modal visibility, selected video, hover effect, search functionality
  const [videos, setVideos] = useState([]); // Videos fetched from YouTube API
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility
  const [selectedVideo, setSelectedVideo] = useState(null); // Selected video to display in modal
  const [hoverIndex, setHoverIndex] = useState(null); // Hover effect for video thumbnails
  const [searchQuery, setSearchQuery] = useState(""); // Search query for videos
  const [isSearching, setIsSearching] = useState(false); // Flag to determine if user is searching
  const [sortOrder, setSortOrder] = useState("date"); // Manage the sort order

  // Function to fetch videos from YouTube API
  const fetchPlaylistVideos = async () => {
    // API key and playlist ID from environment variables to fetch videos
    const API_KEY = import.meta.env.VITE_REACT_APP_YT_API_KEY;
    const playlistId = import.meta.env.VITE_REACT_APP_YT_WHISKEY_PLAYLIST_ID;
    const channelId = "UCASZ7zW_Egu0T4KG3YEdGfw"; // Channel ID for Whiskey!
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`;
    // If user is searching, fetch videos based on search query
    if (isSearching && searchQuery) {
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&q=${searchQuery}&type=video&key=${API_KEY}&maxResults=50`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      let videoItems = data.items.map((item) => ({
        // Check if video ID is in the item object
        id: item.id.videoId || item.snippet.resourceId.videoId,
        title: item.snippet.title, // Video title
        thumbnail: item.snippet.thumbnails.high.url, // Use high quality thumbnail
        publishedAt: item.snippet.publishedAt, // Video publish date
      }));

      // Sort videos by date or title
      videoItems = sortVideos(videoItems, sortOrder);
      setVideos(videoItems);
    } catch (error) {
      console.error("Failed to fetch videos", error);
    }
  };
  // Fetch videos when component mounts and when user searches
  useEffect(() => {
    fetchPlaylistVideos();
  }, [isSearching, searchQuery, sortOrder]);

  // Function to sort the videos array
  const sortVideos = (videos, order) => {
    return [...videos].sort((a, b) => {
      if (order === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "date" ? "title" : "date"); // Toggle sort order
  };

  // Handle search query change in input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length === 0) {
      setIsSearching(false);
    }
  };

  // Handle search when button is clicked
  const handleSearch = () => {
    setIsSearching(true);
  };

  // Open and close modal functions
  const openModal = (video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // YouTube player options
  const opts = {
    height: "390", // Adjusted height
    width: "100%", // Adjusted width to be responsive within the modal
    playerVars: {
      autoplay: 1, // Autoplay the video when modal opens
    },
  };

  // Render video gallery with thumbnails and modal
  return (
    <div className="container mt-2">
      <h2 className="mainH2">Playlist Videos</h2>
      <div className="d-flex justify-content-center align-items-center">
        <div style={{ marginRight: 10 }}>Sort by Date</div>
        <Form.Switch
          id="custom-switch"
          checked={sortOrder === "title"}
          onChange={handleSortChange}
        />
        <div style={{ marginLeft: 10 }}>Sort by Title</div>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search videos"
        style={{ margin: "10px" }}
      />
      <Button onClick={handleSearch}>Search</Button>
      <br />
      <br />
      {/* Map through videos and display thumbnails */}
      <div className="row">
        {videos.map((video, index) => (
          <div
            className="col-md-4 mb-3 video-thumbnail"
            key={video.id}
            onClick={() => openModal(video)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Display video thumbnail, title, and publish date */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="img-fluid"
              style={{ width: "100%", height: "auto%" }}
            />
            <h5
              className="mt-2"
              style={{ color: hoverIndex === index ? "#f05a1b" : "inherit" }}
            >
              {video.title}
            </h5>
            <div>
              <small>{new Date(video.publishedAt).toLocaleDateString()}</small>
            </div>
            {/* Overlay effect on hover */}
            <div
              className="overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 20,
                right: 20,
                bottom: "30%",
                backgroundColor:
                  hoverIndex === index ? "rgba(0, 0, 0, 0.4)" : "transparent",
                transition: "background-color 0.5s ease",
              }}
            ></div>
          </div>
        ))}
      </div>
      {/* Modal to display selected video */}
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        size="lg"
        centered
        style={{
          maxWidth: "95vw",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }} // Prevent the modal from being too wide
      >
        {/* Display the selected video title in the modal header, Body, and video */}
        <div className="modal-mainH4">
          <Modal.Header closeButton style={{ backgroundColor: "#3b7f82" }}>
            <Modal.Title style={{ color: "#ffffff" }}>
              {selectedVideo ? selectedVideo.title : "Loading..."}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#2f2f2f" }}>
            {selectedVideo && (
              <YouTube videoId={selectedVideo.id} opts={opts} />
            )}
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default VideoGallery;
