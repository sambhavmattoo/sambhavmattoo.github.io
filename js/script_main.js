// Variable for scrolling or resizing timeout.
let isScrollingorResizing;

// Funtion to control scrolling behaviour.
function adjustOnScrollDesktop() {

    // Find the elements needed to be modified on scrolling.
    const titleNavbar = document.getElementById("title_navbar");
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");
    const aboutNavbarButton = document.getElementById("about_navbar_button");
    const experienceNavbarButton = document.getElementById("experience_navbar_button");
    const projectsNavbarButton = document.getElementById("projects_navbar_button");
    const blogNavbarButton = document.getElementById("blog_navbar_button");
    const contactNavbarButton = document.getElementById("contact_navbar_button");
    const navbarClearanceFixed = document.getElementById("navbar_clearance_block_fixed");
    const navbarClearanceRelative = document.getElementById("navbar_clearance_block_relative");

    // Initial and final values of CSS attributes.
    const initialHeight = 27.5;                     // in vw
    const finalHeight = 5.25;                       // in vw 
    const initialMinHeight = 315;                   // in px
    const finalMinHeight = 65;                      // in px
    const initialFontSizeVW = 7;                    // in vw
    const initialFontSizePX = 75;                   // in px
    const finalFontSize = 0;                        // Title text disappears
    const initialOpacity = 1;                       // Fully visible
    const finalOpacity = 0;                         // Fully transparent
    const initialTop = 2.5                          // in vw
    const finalTop = 0                              // in vw
    const initialMarginTop = 50;                    // in px
    const finalMarginTop = 10;                      // in px
    const initialLineHeightVW = 8;                  // in vw
    const initialLineHeightPX = 95;                 // in px
    const finalLineHeight = 0;                      // in px
    const initialNavbarButtonMarginTop = 5;         // in vw
    const finalNavbarButtonMarginTop = 0.6;         // in vw
    const pxNavbarButtonMarginTop = 10;             // in px
    const initialNavbarClearanceHeightVW = 27.5     // in vw
    const initialNavbarClearanceHeightPX = 60       // in px
    const finalNavbarClearanceHeightVW = 5.25       // in vw
    const finalNavbarClearanceHeightPX = 20         // in px
    const diffNavbarClearanceHeight = 5.5           // in vw

    // Maximum scroll threshold for transformation.
    const maxScroll = 50; // Adjust for smoothness

    // Calculate scroll position.
    const scrollTop = window.scrollY;

    // Compute new values based on scroll position.
    const newHeight = Math.max(finalHeight, initialHeight - (scrollTop / maxScroll) * (initialHeight - finalHeight));
    const newMinHeight = Math.max(finalMinHeight, initialMinHeight - (scrollTop / maxScroll) * (initialMinHeight - finalMinHeight));
    const newOpacity = Math.max(finalOpacity, initialOpacity - (scrollTop * 8 / maxScroll) * (initialOpacity - finalOpacity));
    const newMarginTop = Math.max(finalMarginTop, initialMarginTop - (scrollTop / maxScroll) * (initialMarginTop - finalMarginTop));
    const newTop = Math.max(finalTop, initialTop - (scrollTop / maxScroll) * (initialTop - finalTop));
    const newNavbarButtonMarginTopVW = Math.max(finalNavbarButtonMarginTop, initialNavbarButtonMarginTop - (scrollTop / maxScroll) * (initialNavbarButtonMarginTop - finalNavbarButtonMarginTop)); 
    const newNavbarButtonMarginTop = Math.max(newNavbarButtonMarginTopVW  * (window.innerWidth / 100), pxNavbarButtonMarginTop);
    
    // Font size: calculate max(7vw, 75px) dynamically and adjust it.
    const vwFontSize = Math.max(finalFontSize, initialFontSizeVW - (scrollTop / maxScroll) * (initialFontSizeVW - finalFontSize));
    const pxFontSize = Math.max(finalFontSize, initialFontSizePX - (scrollTop / maxScroll) * (initialFontSizePX - finalFontSize));
    const newFontSize = Math.max(vwFontSize * (window.innerWidth / 100), pxFontSize); // Adjust max(7vw, 75px)

    // Line height: calculate max(7vw, 95px) dynamically and adjust it.
    const vwLineHeight = Math.max(finalLineHeight, initialLineHeightVW - (scrollTop / maxScroll) * (initialLineHeightVW - finalLineHeight));
    const pxLineHeight = Math.max(finalLineHeight, initialLineHeightPX - (scrollTop / maxScroll) * (initialLineHeightPX - finalLineHeight));
    const newLineHeight = Math.max(vwLineHeight * (window.innerWidth / 100), pxLineHeight); // Adjust max(7vw, 80px)

    // Calculate the relative navbar clearances.
    const initialNavbarClearanceHeight = Math.max(initialNavbarClearanceHeightVW * (window.innerWidth / 100), initialMinHeight) + initialNavbarClearanceHeightPX;
    const finalNavbarClearanceHeight = Math.max(finalNavbarClearanceHeightVW * (window.innerWidth / 100), finalMinHeight) + finalNavbarClearanceHeightPX;
    const newFixedNavbarClearanceHeight = Math.max(finalNavbarClearanceHeight, initialNavbarClearanceHeight - (scrollTop / maxScroll) * (initialNavbarClearanceHeight - finalNavbarClearanceHeight));
    const finalRelativeNavbarClearanceHeight = Math.max((finalNavbarClearanceHeightVW + diffNavbarClearanceHeight)  * (window.innerWidth / 100), finalMinHeight) + finalNavbarClearanceHeightPX;
    const newRelativeNavbarClearanceHeight = Math.max(finalRelativeNavbarClearanceHeight, initialNavbarClearanceHeight - (scrollTop / maxScroll) * (initialNavbarClearanceHeight - finalRelativeNavbarClearanceHeight));

    // Apply styles dynamically.
    titleNavbar.style.height = `${newHeight}vw`;
    titleNavbar.style.minHeight = `${newMinHeight}px`;
    titleNavbar.style.marginTop = `${newMarginTop}px`;
    titleTextUp.style.fontSize = `${newFontSize}px`;
    titleTextUp.style.opacity = newOpacity.toFixed(2);
    titleTextUp.style.lineHeight = `${newLineHeight}px`;
    titleTextUp.style.top = `${newTop}vw`;
    titleTextDown.style.fontSize = `${newFontSize}px`;
    titleTextDown.style.opacity = newOpacity.toFixed(2);
    titleTextDown.style.lineHeight = `${newLineHeight}px`;
    titleTextDown.style.top = `${newTop}vw`;
    aboutNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    experienceNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    projectsNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    blogNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    contactNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}px`;
    navbarClearanceFixed.style.height = `${newFixedNavbarClearanceHeight}px`;
    navbarClearanceRelative.style.height = `${newRelativeNavbarClearanceHeight}px`;

    // Clear the existing timeout to prevent resetting transition prematurely.
    clearTimeout(isScrollingorResizing);

    // Restore transitions for buttons after scrolling stops.
    isScrollingorResizing = setTimeout(() => {
    // Adjust timeout for responsiveness.
    }, 100); 

}

// Funtion to control scrolling behaviour.
function adjustOnScrollMobile() {

    // Find the elements needed to be modified on scrolling.
    const titleNavbar = document.getElementById("title_navbar");
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");
    const aboutNavbarButton = document.getElementById("about_navbar_button");
    const experienceNavbarButton = document.getElementById("experience_navbar_button");
    const projectsNavbarButton = document.getElementById("projects_navbar_button");
    const blogNavbarButton = document.getElementById("blog_navbar_button");
    const contactNavbarButton = document.getElementById("contact_navbar_button");
    const navbarClearanceFixed = document.getElementById("navbar_clearance_block_fixed");
    const navbarClearanceRelative = document.getElementById("navbar_clearance_block_relative");

    // Initial and final values of CSS attributes.
    const initialHeight = 65;                       // in vw
    const finalHeight = 17;                         // in vw 
    const initialFontSizeVW = 12.5;                 // in vw
    const finalFontSize = 0;                        // Title text disappears
    const initialOpacity = 1;                       // Fully visible
    const finalOpacity = 0;                         // Fully transparent
    const initialTop = 7.5                          // in vw
    const finalTop = 0                              // in vw
    const initialMarginTop = 25;                    // in px
    const finalMarginTop = 10;                      // in px
    const initialLineHeightVW = 15;                 // in vw
    const finalLineHeight = 0;                      // in px
    const initialNavbarButtonMarginTop = 15;        // in vw
    const finalNavbarButtonMarginTop = 2.25;        // in vw
    const initialNavbarClearanceHeightVW = 65       // in vw
    const initialNavbarClearanceHeightPX = 35       // in px
    const finalNavbarClearanceHeightVW = 17         // in vw
    const finalNavbarClearanceHeightPX = 20         // in px
    const diffNavbarClearanceHeight = 20            // in vw

    // Maximum scroll threshold for transformation.
    const maxScroll = 50; // Adjust for smoothness

    // Calculate scroll position.
    const scrollTop = window.scrollY;

    // Compute new values based on scroll position.
    const newHeight = Math.max(finalHeight, initialHeight - (scrollTop / maxScroll) * (initialHeight - finalHeight));
    const newOpacity = Math.max(finalOpacity, initialOpacity - (scrollTop * 8 / maxScroll) * (initialOpacity - finalOpacity));
    const newMarginTop = Math.max(finalMarginTop, initialMarginTop - (scrollTop / maxScroll) * (initialMarginTop - finalMarginTop));
    const newTop = Math.max(finalTop, initialTop - (scrollTop / maxScroll) * (initialTop - finalTop));
    const newNavbarButtonMarginTop = Math.max(finalNavbarButtonMarginTop, initialNavbarButtonMarginTop - (scrollTop / maxScroll) * (initialNavbarButtonMarginTop - finalNavbarButtonMarginTop)); 
    const newFontSize = Math.max(finalFontSize, initialFontSizeVW - (scrollTop / maxScroll) * (initialFontSizeVW - finalFontSize));
    const newLineHeight = Math.max(finalLineHeight, initialLineHeightVW - (scrollTop / maxScroll) * (initialLineHeightVW - finalLineHeight));

    // Calculate the relative navbar clearances.
    const initialNavbarClearanceHeight = initialNavbarClearanceHeightVW * (window.innerWidth / 100) + initialNavbarClearanceHeightPX;
    const finalNavbarClearanceHeight = finalNavbarClearanceHeightVW * (window.innerWidth / 100) + finalNavbarClearanceHeightPX;
    const newFixedNavbarClearanceHeight = Math.max(finalNavbarClearanceHeight, initialNavbarClearanceHeight - (scrollTop / maxScroll) * (initialNavbarClearanceHeight - finalNavbarClearanceHeight));
    const finalRelativeNavbarClearanceHeight = (finalNavbarClearanceHeightVW + diffNavbarClearanceHeight)  * (window.innerWidth / 100) + finalNavbarClearanceHeightPX;
    const newRelativeNavbarClearanceHeight = Math.max(finalRelativeNavbarClearanceHeight, initialNavbarClearanceHeight - (scrollTop / maxScroll) * (initialNavbarClearanceHeight - finalRelativeNavbarClearanceHeight));

    // Apply styles dynamically.
    titleNavbar.style.height = `${newHeight}vw`;
    titleNavbar.style.minHeight = `0px`;
    titleNavbar.style.marginTop = `${newMarginTop}px`;
    titleTextUp.style.fontSize = `${newFontSize}vw`;
    titleTextUp.style.opacity = newOpacity.toFixed(2);
    titleTextUp.style.lineHeight = `${newLineHeight}vw`;
    titleTextUp.style.top = `${newTop}vw`;
    titleTextDown.style.fontSize = `${newFontSize}vw`;
    titleTextDown.style.opacity = newOpacity.toFixed(2);
    titleTextDown.style.lineHeight = `${newLineHeight}vw`;
    titleTextDown.style.top = `${newTop}vw`;
    aboutNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}vw`;
    experienceNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}vw`;
    projectsNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}vw`;
    blogNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}vw`;
    contactNavbarButton.style.marginTop = `${newNavbarButtonMarginTop}vw`;
    navbarClearanceFixed.style.height = `${newFixedNavbarClearanceHeight}px`;
    navbarClearanceRelative.style.height = `${newRelativeNavbarClearanceHeight}px`;

    // Clear the existing timeout to prevent resetting transition prematurely.
    clearTimeout(isScrollingorResizing);

    // Restore transitions for buttons after scrolling stops.
    isScrollingorResizing = setTimeout(() => {
    // Adjust timeout for responsiveness.
    }, 100); 

}

// Function to control resizing behaviour.
function adjustOnResizeDesktop() {

    // Call adjustOnScroll to recalculate everything.
    adjustOnScrollDesktop();
    
    // Find the elements needed to be modified on resizing.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");

    // Recalculate font size based on viewport width.
    const initialFontSizeVW = 7;                                            // in vw
    const initialFontSizePX = 75;                                           // in px
    const vwFontSize = initialFontSizeVW * (window.innerWidth / 100);
    const newFontSize = Math.max(vwFontSize, initialFontSizePX);

    // Apply dynamic font size to title text.
    titleTextUp.style.fontSize = `${newFontSize}px`;
    titleTextDown.style.fontSize = `${newFontSize}px`;

    // Clear the existing timeout to prevent resetting transition prematurely.
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops.
    isScrollingorResizing = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Function to control resizing behaviour.
function adjustOnResizeMobile() {

    // Call adjustOnScroll to recalculate everything.
    adjustOnScrollMobile();
    
    // Find the elements needed to be modified on resizing.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");

    // Recalculate font size based on viewport width.
    const initialFontSizeVW = 12.5;                                         // in vw
    const newFontSize = initialFontSizeVW * (window.innerWidth / 100);

    // Apply dynamic font size to title text.
    titleTextUp.style.fontSize = `${newFontSize}px`;
    titleTextDown.style.fontSize = `${newFontSize}px`;

    // Clear the existing timeout to prevent resetting transition prematurely.
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops.
    isScrollingorResizing = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Main function to launch any js animations. Divided for mobile and desktop versions.
function mainAnimations() {

    // Desktop version.
    if (window.innerWidth > 600) {
        // Initial resizing to stop resize lag.
        adjustOnResizeDesktop();
        // Attach scroll and resize event listeners.
        window.removeEventListener("scroll", adjustOnScrollMobile);
        window.removeEventListener("resize", adjustOnResizeMobile);
        window.addEventListener("scroll", adjustOnScrollDesktop);
        window.addEventListener("resize", adjustOnResizeDesktop);
    }

    // Mobile version. 
    else {
        // Initial resizing to stop resize lag.
        adjustOnResizeMobile();
        // Attach scroll and resize event listeners.
        window.removeEventListener("scroll", adjustOnScrollDesktop);
        window.removeEventListener("resize", adjustOnResizeDesktop);
        window.addEventListener("scroll", adjustOnScrollMobile);
        window.addEventListener("resize", adjustOnResizeMobile);
    } 

}

window.addEventListener("resize", mainAnimations)
window.addEventListener("scroll", mainAnimations)

// Trigger initial adjustment on page load
mainAnimations();





