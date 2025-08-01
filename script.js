function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnimation(){
var tl = gsap.timeline()
tl.from(".line h1", {
  y: 150,
  stagger: 0.25,
  duration: 0.6,
  delay:0.5
});
tl.from("#line1-part1", {
  opacity:0,
  onStart: function(){
   var h5timer = document.querySelector("#line1-part1 h5")
   var grow = 0
   setInterval(function(){
     if(grow<100){
       grow++
       h5timer.innerHTML = grow++
    }
    else{
      h5timer.innerHTML = grow
    }
   },28);
 },
});
tl.to(".line h2",{
  animationName: "loader-Anime",
  opacity:1
})

tl.to("#loader",{
   opacity:0,
   duration: 0.2,
   delay:2.6
});
tl.from("#page1",{
  delay:0.1,
  y: 1600,
  opacity:0,
  duration:0.5,
  ease: Power4
})
tl.to("#loader",{
  display:"none"
})
tl.from("#nav",{
  opacity:0
})
tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1",{
  y: 140,
  stagger:0.2
})
tl.from("#hero1, #page2",{
  opacity: 0,
  stagger:0.2
},"-=1.2")
}
function cursorAnimation(){
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320,1)",
    duration: 1,
  });

  Shery.makeMagnet("#nav-part2 h4");

  // Mousefollower follows mouse
  document.addEventListener("mousemove", function(e) {
    const follower = document.querySelector(".mousefollower");
    if (follower) {
      gsap.to(follower, {
        left: e.clientX - follower.offsetWidth / 2,
        top: e.clientY - follower.offsetHeight / 2,
        duration: 0.2,
        ease: "power2.out",
        position: "fixed"
      });
    }
  });

  // Video logic
  var videoContainer = document.querySelector("#video-container");
  var video = document.querySelector("#video");
  var videoCursor = document.querySelector("#video-cursor");
  var icon = videoCursor.querySelector("i");
  // Center the icon with flex
  videoCursor.style.display = "flex";
  videoCursor.style.alignItems = "center";
  videoCursor.style.justifyContent = "center";

  videoContainer.addEventListener("mouseenter", function() {
    gsap.to(".mousefollower", { opacity: 0 });
    videoContainer.addEventListener("mousemove", moveCursor);
  });
  videoContainer.addEventListener("mouseleave", function() {
    gsap.to(".mousefollower", { opacity: 1 });
    gsap.to(videoCursor, {
      left: "70%",
      top: "-15%",
      duration: 0.3
    });
    videoContainer.removeEventListener("mousemove", moveCursor);
  });

  function moveCursor(e) {
    // Get bounding rect for relative mouse position
    const rect = videoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(videoCursor, {
      left: x - videoCursor.offsetWidth / 2,
      top: y - videoCursor.offsetHeight / 2,
      duration: 0.2,
      ease: "power2.out",
      position: "absolute"
    });
  }

  var flag = 0;
  videoContainer.addEventListener("click", function() {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      videoCursor.innerHTML = `<i class=\"ri-pause-mini-fill\"></i>`;
      gsap.to(videoCursor, { scale: 0.5, duration: 0.2 });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      videoCursor.innerHTML = `<i class=\"ri-play-fill\"></i>`;
      gsap.to(videoCursor, { scale: 1, duration: 0.2 });
      flag = 0;
    }
  });
}
function sheryAnimation(){
  Shery.imageEffect(".image-div",{
    style: 5,
    config: {"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.31,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.76,"range":[0,10]},"metaball":{"value":0.41,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":7.63,"range":[0,100]}},
    gooey: true,
  })
}

function flagAnimation(){
document.addEventListener("mousemove", function(dets){
   gsap.to("#flag", {
    x: dets.x,
    y: dets.y,
  })
})

document.querySelector("#hero3").addEventListener("mouseenter", function(){
  gsap.to("#flag", {
    opacity: 1
  });
})
document.querySelector("#hero3").addEventListener("mouseleave", function(){
  gsap.to("#flag", {
    opacity: 0
  });
})
}

function footerAnimation(){
  var clutter = ""
  var clutter2 = ""
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem){
    clutter+= `<span>${elem}</span>`
  })
  document.querySelector("#footer h1").innerHTML = clutter
  document.querySelector("#footer h2").textContent.split("").forEach(function(elem){
    clutter2 +=  `<span>${elem}</span>`
  })
  document.querySelector("#footer h2").innerHTML = clutter2
  document.querySelector("#footer-text").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      opacity: 0,
      stagger: 0.05
    })
    gsap.to("#footer h2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.1
    })
  })
  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,

    })
    gsap.to("#footer h2 span", {
      opacity: 0,
      stagger: 0.05
    })
  })
}
loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
flagAnimation();
footerAnimation();