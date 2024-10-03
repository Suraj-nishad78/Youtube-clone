const API_KEY = 'AIzaSyBmecY4IgRzVIXTONtxanov6nQ9a38HnDY'
let query = ''
let quantity = 12;

let searchBtn =  document.getElementById('search-btn')
searchBtn.addEventListener('click',()=>searchVideo(quantity))

function searchVideo(quantity) {
  query = document.getElementById('search-input').value.trim()
  fetchVideos(query,quantity)
}

async function fetchVideos(query,quantity) {
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&&type=video&maxResults=${quantity}&q=${query}&key=${API_KEY}`)
    const data = await res.json()
    displayVideos(data.items)
  } catch (error) {
    console.log(error)
  }
}

let buttonBox = document.getElementById('more-result')

function displayVideos(videos) {
  const videoSection = document.getElementById('video-section')
  videoSection.innerHTML = ''

  videos.forEach((video) => {
    const { videoId } = video.id;
    const  videoTitle  = video.snippet.title;
    const  videoChannelTitle  = video.snippet.channelTitle;
    const channelImage = video.snippet.thumbnails.default.url;

    const videoContainer = document.createElement('div')
    videoContainer.classList.add('video-container')

    const iframe = document.createElement('iframe');
    iframe.width='350';
    iframe.height='200';
    iframe.src=`https://www.youtube.com/embed/${videoId}`;
    iframe.title='YouTube video player';
    iframe.setAttribute('frameborder', '0');
    iframe.allow=`'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'`;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');

    const videoContent = document.createElement('div')
    videoContent.classList.add('video-content')

    const videoImage = document.createElement('img')
    videoImage.src = channelImage;

    const videoTitleP = document.createElement('p')
    videoTitleP.textContent = videoTitle;

    const channelTitle = document.createElement('h4')
    channelTitle.innerHTML = `${videoChannelTitle} &nbsp;<i class="fa-solid fa-circle-check"></i>`
    
    videoContent.append(videoImage,videoTitleP,channelTitle)
    videoContainer.append(iframe,videoContent)
    videoSection.append(videoContainer)
  })
  buttonBox.innerHTML = ''
  const button = document.createElement('button')
  button.classList.add('more-result')
  button.innerHTML = `More Video &nbsp;<i class="fa-solid fa-angle-right"></i>`
  button.addEventListener('click', moreVideo)
  buttonBox.append(button)
}

function moreVideo(){
  quantity+=12
  if(quantity > 48){
    quantity = 12;
  }

query = searchInput.value;
fetchVideos(query,quantity)
}

// sidebar-content
let sidebarContent = document.getElementById('sidebar-content')
let profileDetails = document.getElementById('profile-details')
let dropdownYou = document.getElementById('dropdown-you')
let hr = document.getElementById('hr')
let userIcon = document.getElementById('user')
let angleRightIcon = document.getElementById('angle-right')

sidebarContent.addEventListener('click',()=>{
  let sidebar = document.querySelectorAll('#sidebar .sidebar-icon')
  sidebar.forEach(side=>{
    side.classList.toggle('sidebar-click')
  })
  dropdownYou.classList.toggle('hidden')
  hr.classList.toggle('hidden')
  userIcon.classList.toggle('hidden')
  angleRightIcon.classList.toggle('hidden')
 
})

// fix search bar
let fixSearch = document.querySelectorAll('#fix-search-bar ul li')
let searchInput = document.getElementById('search-input')

fixSearch.forEach(li=>{
  li.addEventListener('click',()=>{
    searchInput.value = ''
    searchInput.value = li.textContent;
    let search = li.textContent
    fetchVideos(search,quantity)
  })
})