// Variable for scrolling or resizing timeout.
let isScrollingorResizing;

// Funtion to control scrolling behaviour.
function adjustOnScroll() {

    // Find the elements needed to be modified on scrolling.
    const titleNavbar = document.getElementById("title_navbar");
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");
    const aboutNavbarButton = document.getElementById("about_navbar_button");
    const experienceNavbarButton = document.getElementById("experience_navbar_button");
    const projectsNavbarButton = document.getElementById("projects_navbar_button");
    const blogNavbarButton = document.getElementById("blog_navbar_button");
    const contactNavbarButton = document.getElementById("contact_navbar_button");

    // Change transition duration of navigation buttons while scrolling to stop button "lag".
    aboutNavbarButton.style.transitionDuration = "0s";
    experienceNavbarButton.style.transitionDuration = "0s";
    projectsNavbarButton.style.transitionDuration = "0s";
    blogNavbarButton.style.transitionDuration = "0s";
    contactNavbarButton.style.transitionDuration = "0s";

    // Initial and final values of CSS attributes.
    const initialHeight = 50;                   // in vh
    const finalHeight = 10;                     // in vh 
    const initialMinHeight = 350;               // in px
    const finalMinHeight = 65;                  // in px
    const initialFontSizeVW = 7;                // in vw
    const initialFontSizePX = 75;               // in px
    const finalFontSize = 0;                    // Title text disappears
    const initialOpacity = 1;                   // Fully visible
    const finalOpacity = 0;                     // Fully transparent
    const initialTop = 25                       // in px
    const finalTop = 0                          // in px
    const initialMarginTop = 50;                // in px
    const finalMarginTop = 10;                  // in px
    const initialLineHeightVW = 7;              // in vw
    const initialLineHeightPX = 95;             // in px
    const finalLineHeight = 0;                  // in px
    const initialNavbarButtonMarginTop = 10;    // in vh
    const finalNavbarButtonMarginTop = 1.25;    // in vh
    const pxNavbarButtonMarginTop = 10;         // in px

    // Maximum scroll threshold for transformation
    const maxScroll = 50; // Adjust for smoothness

    // Calculate scroll position
    const scrollTop = window.scrollY;

    // Compute new values based on scroll position
    const newHeight = Math.max(finalHeight, initialHeight - (scrollTop / maxScroll) * (initialHeight - finalHeight));
    const newMinHeight = Math.max(finalMinHeight, initialMinHeight - (scrollTop / maxScroll) * (initialMinHeight - finalMinHeight));
    const newOpacity = Math.max(finalOpacity, initialOpacity - (scrollTop * 8 / maxScroll) * (initialOpacity - finalOpacity));
    const newMarginTop = Math.max(finalMarginTop, initialMarginTop - (scrollTop / maxScroll) * (initialMarginTop - finalMarginTop));
    const newTop = Math.max(finalTop, initialTop - (scrollTop / maxScroll) * (initialTop - finalTop));
    const newNavbarButtonMarginTopVH = Math.max(finalNavbarButtonMarginTop, initialNavbarButtonMarginTop - (scrollTop / maxScroll) * (initialNavbarButtonMarginTop - finalNavbarButtonMarginTop));
    const newNavbarButtonMarginTop = Math.max(newNavbarButtonMarginTopVH  * (window.innerHeight / 100), pxNavbarButtonMarginTop)

    // Font size: calculate max(7vw, 75px) dynamically and adjust it
    const vwFontSize = Math.max(finalFontSize, initialFontSizeVW - (scrollTop / maxScroll) * (initialFontSizeVW - finalFontSize));
    const pxFontSize = Math.max(finalFontSize, initialFontSizePX - (scrollTop / maxScroll) * (initialFontSizePX - finalFontSize));
    const newFontSize = Math.max(vwFontSize * (window.innerWidth / 100), pxFontSize); // Adjust max(7vw, 75px)

    // Line height: calculate max(7vw, 95px) dynamically and adjust it
    const vwLineHeight = Math.max(finalLineHeight, initialLineHeightVW - (scrollTop / maxScroll) * (initialLineHeightVW - finalLineHeight));
    const pxLineHeight = Math.max(finalLineHeight, initialLineHeightPX - (scrollTop / maxScroll) * (initialLineHeightPX - finalLineHeight));
    const newLineHeight = Math.max(vwLineHeight * (window.innerWidth / 100), pxLineHeight); // Adjust max(7vw, 80px)

    // Apply styles dynamically
    titleNavbar.style.height = `${newHeight}vh`;
    titleNavbar.style.minHeight = `${newMinHeight}px`;
    titleNavbar.style.marginTop = `${newMarginTop}px`;
    titleTextUp.style.fontSize = `${newFontSize}px`;
    titleTextUp.style.opacity = newOpacity.toFixed(2);
    titleTextUp.style.lineHeight = `${newLineHeight}px`;
    titleTextUp.style.top = `${newTop}px`;
    titleTextDown.style.fontSize = `${newFontSize}px`;
    titleTextDown.style.opacity = newOpacity.toFixed(2);
    titleTextDown.style.lineHeight = `${newLineHeight}px`;
    titleTextDown.style.top = `${newTop}px`;
    aboutNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    experienceNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    projectsNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    blogNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    contactNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;

    // Clear the existing timeout to prevent resetting transition prematurely
    clearTimeout(isScrollingorResizing);

    // Restore transitions for buttons after scrolling stops
    isScrollingorResizing = setTimeout(() => {
        aboutNavbarButton.style.transitionDuration = "0.4s";
        experienceNavbarButton.style.transitionDuration = "0.4s";
        projectsNavbarButton.style.transitionDuration = "0.4s";
        blogNavbarButton.style.transitionDuration = "0.4s";
        contactNavbarButton.style.transitionDuration = "0.4s";
    // Adjust timeout for responsiveness
    }, 100); 

}

// Function to control resizing behaviour.
function adjustOnResize() {

    // Call adjustOnScroll to recalculate everything
    adjustOnScroll();
    
    // Find the elements needed to be modified on resizing.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");
    const aboutNavbarButton = document.getElementById("about_navbar_button");
    const experienceNavbarButton = document.getElementById("experience_navbar_button");
    const projectsNavbarButton = document.getElementById("projects_navbar_button");
    const blogNavbarButton = document.getElementById("blog_navbar_button");
    const contactNavbarButton = document.getElementById("contact_navbar_button");

    // Recalculate font size based on viewport width.
    const initialFontSizeVW = 7;                                            // in vw
    const initialFontSizePX = 75;                                           // in px
    const vwFontSize = initialFontSizeVW * (window.innerWidth / 100);
    const newFontSize = Math.max(vwFontSize, initialFontSizePX);

    // Apply dynamic font size to title text
    titleTextUp.style.fontSize = `${newFontSize}px`;
    titleTextDown.style.fontSize = `${newFontSize}px`;

    // Change transition duration of navigation buttons while scrolling to stop button "lag".
    aboutNavbarButton.style.transitionDuration = "0s";
    experienceNavbarButton.style.transitionDuration = "0s";
    projectsNavbarButton.style.transitionDuration = "0s";
    blogNavbarButton.style.transitionDuration = "0s";
    contactNavbarButton.style.transitionDuration = "0s";

    // Clear the existing timeout to prevent resetting transition prematurely
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops
    isScrollingorResizing = setTimeout(() => {
        aboutNavbarButton.style.transitionDuration = "0.4s";
        experienceNavbarButton.style.transitionDuration = "0.4s";
        projectsNavbarButton.style.transitionDuration = "0.4s";
        blogNavbarButton.style.transitionDuration = "0.4s";
        contactNavbarButton.style.transitionDuration = "0.4s";
    }, 100); // Small delay for smooth transition restoration
}

// Attach scroll and resize event listeners
window.addEventListener("scroll", adjustOnScroll);
window.addEventListener("resize", adjustOnResize);

// Trigger initial adjustment on page load
adjustOnScroll();


