function locomotiveAnimation(){
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

// locomotiveAnimation()

function Cursor() {
    document.addEventListener("mousemove", function(dets) {
        gsap.to("#crsr", {
            left: dets.clientX, 
            top: dets.clientY, 
            duration: 0.1,     
            ease: "linear"    
        });
    });
}
Cursor();

function SvgRotate(){
    gsap.to("#svg1", {
        repeat: -1,
        rotate: "360deg",
        duration: 30,
        transformOrigin: "50% 50%",
    });
}
SvgRotate();

function timeline(){
    var tl = gsap.timeline();

tl.from(".nav",{
    opacity:0,
    y:-30,
    ease:"linear",
})

tl.from(".hero-txt h1, .hero-txt p",{
    y:150,
    stagger: 0.25,
})
tl.from(".texts a",{
    opacity:0
})

tl.from("#svg1",{
    opacity:0
})
tl.from(".elem",{
    opacity:0
})
}
timeline()
