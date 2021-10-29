let btn = document.querySelector("#btn")

btn.addEventListener("click", async function() {
  let color = btn.style.backgroundColor
  if (color == 'red') {
    btn.style.backgroundColor = '#353535'
  }
  else {
    btn.style.backgroundColor = 'red'
  }

  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })

  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ?
    "video/webm; codecs=vp9" :
    "video/webm"
  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  })

  let chunks = []
  mediaRecorder.addEventListener('dataavailable', function(e) {
    chunks.push(e.data)
  })

  mediaRecorder.addEventListener('stop', function() {
    let blob = new Blob(chunks, {
      type: chunks[0].type
    })
    let url = URL.createObjectURL(blob)

    let video = document.querySelector("video")
    video.src = url

    let a = document.createElement('a')
    a.href = url
    let d = new Date();
    let date = String(d.getFullYear()) + String(d.getMonth()) + String(d.getDate())
    let time = String(d.getHours()) + String(d.getMinutes()) + String(d.getSeconds())
    let vname = "Screenrecorder_" + date + "_" + time + ".webm"
    a.download = vname
    a.click()
  })

  mediaRecorder.start()
})