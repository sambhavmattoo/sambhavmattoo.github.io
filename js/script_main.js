// Variable for scrolling or resizing timeout. Used for navbar behaviour on scroll and resize.
let isScrollingorResizingTimeout;

// Variables for scrolling and resizing detection. Used for navbar button animations.
let isScrolling = false;
let isResizing = false;

// Flag to track if typing speed needs to be faster.
let isTypingFaster = false;

// To store all timeout IDs for navbar button animations.
let navbarButtonTimeoutIDs = []; 

// Funtion to control scrolling behaviour for Desktop version.
function adjustOnScrollNavbarDesktop() {

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
    const initialNavbarClearanceHeightVW = 27.5;    // in vw
    const initialNavbarClearanceHeightPX = 60;      // in px
    const finalNavbarClearanceHeightVW = 5.25;      // in vw
    const finalNavbarClearanceHeightPX = 20;        // in px
    const diffNavbarClearanceHeight = 5.5;          // in vw

    // Maximum scroll threshold for transformation.
    const maxScroll = 25;   // Adjust for smoothness.

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
    clearTimeout(isScrollingorResizingTimeout);

    // Restore transitions for buttons after scrolling stops.
    isScrollingorResizingTimeout = setTimeout(() => {
    // Adjust timeout for responsiveness.
    }, 100); 

}

// Funtion to control scrolling behaviour for Mobile version.
function adjustOnScrollNavbarMobile() {

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
    const maxScroll = 25;   // Adjust for smoothness.

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
    clearTimeout(isScrollingorResizingTimeout);

    // Restore transitions for buttons after scrolling stops.
    isScrollingorResizingTimeout = setTimeout(() => {
    // Adjust timeout for responsiveness.
    }, 100); 

}

// Function to control resizing behaviour for Desktop version.
function adjustOnResizeNavbarDesktop() {

    // Call adjustOnScroll to recalculate everything.
    adjustOnScrollNavbarDesktop();
    
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
    clearTimeout(isScrollingorResizingTimeout);

    // Restore transition after resize stops.
    isScrollingorResizingTimeout = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Function to control resizing behaviour for Mobile version.
function adjustOnResizeNavbarMobile() {

    // Call adjustOnScroll to recalculate everything.
    adjustOnScrollNavbarMobile();
    
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
    clearTimeout(isScrollingorResizingTimeout);

    // Restore transition after resize stops.
    isScrollingorResizingTimeout = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Function for setting navbar button's default styles in case of scrolling or resizing.
function navbarButtonSetDefaults(buttonID, imageID) {
    
    // Desktop version.
    if (window.innerWidth > 600) {
        // Find the elements needed to be modified.
        const navbarButton = document.getElementById(buttonID);
        const navbarImage = document.getElementById(imageID);

        // Set the default styles for the navbar button.
        navbarButton.style.opacity = "1";
        navbarButton.style.fontSize = `${Math.max(1.2 * (window.innerWidth / 100), 12)}px`;
        navbarButton.style.height = `${4 * (window.innerWidth / 100)}px`;
        navbarButton.style.minHeight = "45px";
        navbarButton.style.outlineWidth = "2px";
        navbarButton.style.width = `${8 * (window.innerWidth / 100)}px`;
        navbarButton.style.minWidth = "75px";
        navbarButton.style.marginLeft = "1.25vw";
        navbarButton.style.marginRight = "1.25vw";
        navbarButton.style.display = "inline";
        navbarButton.style.display = "inline";
        navbarImage.style.display = "none";
    }

    // Mobile version.
    else {
        // Find the elements needed to be modified.
        const navbarButton = document.getElementById(buttonID);
        const navbarImage = document.getElementById(imageID);

        // Set the default styles for the navbar button.
        navbarButton.style.opacity = "1";
        navbarButton.style.height = `${12.5 * (window.innerWidth / 100)}px`;
        navbarButton.style.width = `${12.5 * (window.innerWidth / 100)}px`;
        navbarButton.style.minHeight = "0px";
        navbarButton.style.minWidth = "0px";
        navbarButton.style.outlineWidth = "2px";
        navbarButton.style.marginLeft = "1.25vw";
        navbarButton.style.marginRight = "1.25vw";
        navbarImage.style.opacity = "1";
        navbarImage.style.height = `${7.5 * (window.innerWidth / 100)}px`;
        navbarImage.style.width = `${7.5 * (window.innerWidth / 100)}px`;
        navbarButton.style.display = "inline";
        navbarImage.style.display = "block";
    }
}

// Function for setting navbar button's default styles in case of scrolling or resizing for all buttons.
function navbarButtonSetDefaultsToAll() {
    navbarButtonSetDefaults("about_navbar_button", "about_navbar_image");
    navbarButtonSetDefaults("experience_navbar_button", "experience_navbar_image");
    navbarButtonSetDefaults("projects_navbar_button", "projects_navbar_image");
    navbarButtonSetDefaults("blog_navbar_button", "blog_navbar_image");
    navbarButtonSetDefaults("contact_navbar_button", "contact_navbar_image");
}

// Main function to launch any main .js animations. Divided for mobile and desktop versions.
function mainAnimations() {

    titleNavbarSetDefaults();
    navbarButtonSetDefaultsToAll();

    // Desktop version.
    if (window.innerWidth > 600) {
        // Initial resizing to stop resize lag.
        adjustOnResizeNavbarDesktop();
        // Attach scroll and resize event listeners.
        window.removeEventListener("scroll", adjustOnScrollNavbarMobile);
        window.removeEventListener("resize", adjustOnResizeNavbarMobile);
        window.addEventListener("scroll", adjustOnScrollNavbarDesktop);
        window.addEventListener("resize", adjustOnResizeNavbarDesktop);
    }

    // Mobile version. 
    else {
        // Initial resizing to stop resize lag.
        adjustOnResizeNavbarMobile();
        // Attach scroll and resize event listeners.
        window.removeEventListener("scroll", adjustOnScrollNavbarDesktop);
        window.removeEventListener("resize", adjustOnResizeNavbarDesktop);
        window.addEventListener("scroll", adjustOnScrollNavbarMobile);
        window.addEventListener("resize", adjustOnResizeNavbarMobile);
    } 

}

// Function for making the title navbar appear and grow to it's final size for Desktop version.
function titleNavbarPageLoadDesktop() {

    // Find the elements needed to be animated.
    const titleNavbar = document.getElementById("title_navbar");

    // This is to stop a glitch where the title navbar loads twice if scroll or resize events have occured before loading.
    if (titleNavbar.style.display != "inline") {

        // Ensure initial styles for smooth transition (in case they are not set).
        titleNavbar.style.height = "0px";
        titleNavbar.style.minHeight = "0px";
        titleNavbar.style.outlineWidth = "0px";
        titleNavbar.style.display = "inline";

        // Set a delay of 0.5 seconds before starting the animation.
        setTimeout(() => {
            // Final values (initial state before animation begins).
            const finalHeight = 27.5;                       // Final height in vw.
            const initialHeight = 0;                        // Starting point for height (transition from 0).
            const finalMinHeight = 315;                     // Final minimum height in px.
            const initialMinHeight = 0;                     // Starting point for minimum height (transition from 0).
            const finalOutlineWidth = 2;                    // Final outline width in px.
            const initialOutlineWidth = 0;                  // Starting point for outline width (transition from 0).

            let lastWidth = window.innerWidth;      // Store the initial width for resize detection.
            let lastHeight = window.innerHeight;    // Store the initial height for resize detection.

            // Duration of animation in seconds
            const duration = 0.5;   // 0.5 seconds to animate the properties.
            const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
            let step = 0;           // Track the progress of the animation.

            // Start animation by gradually changing the properties over time.
            const animationInterval = setInterval(() => {
                let progress = step / steps; // progress value from 0 to 1.

                // Calculate the updated height.
                const updatedHeight = initialHeight + progress * (finalHeight - initialHeight);

                // Calculate the updated minimum height.
                const updatedMinHeight = initialMinHeight + progress * (finalMinHeight - initialMinHeight);

                // Calculate the updated outline width.
                const updatedOutlineWidth = initialOutlineWidth + progress * (finalOutlineWidth - initialOutlineWidth);

                // Apply the updated values to the elements.
                titleNavbar.style.height = `${updatedHeight}vw`;
                titleNavbar.style.minHeight = `${updatedMinHeight}px`;
                titleNavbar.style.outlineWidth = `${updatedOutlineWidth}px`;

                // Increment the step to move to the next frame.
                step++;

                // If animation is interrupted by scrolling, go do the main animations.
                if (window.scrollY != 0) {
                    mainAnimations();
                    clearInterval(animationInterval);
                }

                // Check if the window size has changed (resize detection).
                if (window.innerWidth !== lastWidth || window.innerHeight !== lastHeight) {

                    // If resized, stop the animation and reset styles.
                    clearInterval(animationInterval);
                
                    // Reset styles immediately.
                    titleNavbarSetDefaults();
                                
                    // Exit the animation loop.
                    return; 
                }

                // Stop the animation after the set number of steps.
                if (step >= steps) {

                    // If animation is interrupted by scrolling, go do the main animations.
                    if (window.scrollY != 0) {
                        mainAnimations();
                        clearInterval(animationInterval);
                    }

                    // Final step - explicitly set the values to ensure precision.
                    titleNavbar.style.height = `${finalHeight}vw`;
                    titleNavbar.style.minHeight = `${finalMinHeight}px`;
                    titleNavbar.style.outlineWidth = `${finalOutlineWidth}px`;
                    clearInterval(animationInterval);

                }
            // Set the interval based on the duration and frame count.
            }, duration * 1000 / steps);
        // Delay before starting the animation (10ms).
        }, 10);

    }

}

// Function for making the title navbar appear and grow to it's final size for Mobile version.
function titleNavbarPageLoadMobile() {

    // Find the elements needed to be animated.
    const titleNavbar = document.getElementById("title_navbar");

    // This is to stop a glitch where the title navbar loads twice if scroll or resize events have occured before loading.
    if (titleNavbar.style.display != "inline") {

        // Ensure initial styles for smooth transition (in case they are not set).
        titleNavbar.style.height = "0px";
        titleNavbar.style.minHeight = "0px";
        titleNavbar.style.outlineWidth = "0px";
        titleNavbar.style.display = "inline";

        // Set a delay of 0.5 seconds before starting the animation.
        setTimeout(() => {

            // Final values (initial state before animation begins).
            const finalHeight = 65;                         // Final height in vw.
            const initialHeight = 0;                        // Starting point for height (transition from 0).
            const finalOutlineWidth = 2;                    // Final outline width in px.
            const initialOutlineWidth = 0;                  // Starting point for outline width (transition from 0).

            let lastWidth = window.innerWidth;      // Store the initial width for resize detection.
            let lastHeight = window.innerHeight;    // Store the initial height for resize detection.

            // Duration of animation in seconds
            const duration = 0.5;   // 0.5 seconds to animate the properties.
            const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
            let step = 0;           // Track the progress of the animation.

            // Start animation by gradually changing the properties over time.
            const animationInterval = setInterval(() => {
                let progress = step / steps; // progress value from 0 to 1.

                // Calculate the updated height.
                const updatedHeight = initialHeight + progress * (finalHeight - initialHeight);

                // Calculate the updated outline width.
                const updatedOutlineWidth = initialOutlineWidth + progress * (finalOutlineWidth - initialOutlineWidth);

                // Apply the updated values to the elements.
                titleNavbar.style.height = `${updatedHeight}vw`;
                titleNavbar.style.minHeight = "0px";
                titleNavbar.style.outlineWidth = `${updatedOutlineWidth}px`;

                // Increment the step to move to the next frame.
                step++;

                // If animation is interrupted by scrolling, go do the main animations.
                if (window.scrollY != 0) {
                    mainAnimations();
                    clearInterval(animationInterval);
                }

                // Check if the window size has changed (resize detection).
                if (window.innerWidth !== lastWidth || window.innerHeight !== lastHeight) {

                    // If resized, stop the animation and reset styles.
                    clearInterval(animationInterval);
                
                    // Reset styles immediately.
                    titleNavbarSetDefaults();
                                
                    // Exit the animation loop.
                    return; 
                }

                // Stop the animation after the set number of steps
                if (step >= steps) {

                    // If animation is interrupted by scrolling, go do the main animations.
                    if (window.scrollY != 0) {
                        mainAnimations();
                        clearInterval(animationInterval);
                    }

                    // Final step - explicitly set the values to ensure precision.
                    titleNavbar.style.height = `${finalHeight}vw`;
                    titleNavbar.style.minHeight = "0px";
                    titleNavbar.style.outlineWidth = `${finalOutlineWidth}px`;
                    clearInterval(animationInterval);
                }
            // Set the interval based on the duration and frame count.
            }, duration * 1000 / steps);

        // Delay before starting the animation (10ms).
        }, 10);
    }
}

// Function for making the title navbar appear and grow to it's final size for both versions in a single function.
function titleNavbarPageLoad() {
    // Desktop version.
    if (window.innerWidth > 600) {
        titleNavbarPageLoadDesktop();
    }

    // Mobile version.
    else {
        titleNavbarPageLoadMobile();
    }
}

// Function for setting defaults for the title navbar in case of scrolling or resizing.
function titleNavbarSetDefaults() {

    // Desktop version.
    if (window.innerWidth > 600) {
        // Find the elements needed to be modified.
        const titleNavbar = document.getElementById("title_navbar");

        // Set the default styles for the title navbar.
        titleNavbar.style.height = "27.5vw";
        titleNavbar.style.minHeight = "315px";
        titleNavbar.style.outlineWidth = "2px";
        titleNavbar.style.display = "inline";
    }

    // Mobile version.
    else {
        // Find the elements needed to be modified.
        const titleNavbar = document.getElementById("title_navbar");

        // Set the default styles for the title navbar.
        titleNavbar.style.height = "65vw";
        titleNavbar.style.minHeight = "0px";
        titleNavbar.style.outlineWidth = "2px";
        titleNavbar.style.display = "inline";
    }
}

// Function for title text appearing and growing to it's final size for Desktop version.
function titleTextPageLoadDesktop() {

    // Find the elements needed to be animated.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");

    // Check to ensure no glitch where title text loads twice if scrolled or resized before first load.
    if (titleTextUp.style.opacity != "1" || titleTextDown.style.opacity != "1") {

        // Ensure initial styles for smooth transition (in case they are not set).
        titleTextUp.style.opacity = "0";
        titleTextUp.style.fontSize = "0px";
        titleTextUp.style.lineHeight = "0px";
        titleTextDown.style.opacity = "0";
        titleTextDown.style.fontSize = "0px";
        titleTextDown.style.lineHeight = "0px";

        // Set a delay of 0.5 seconds before starting the animation.
        setTimeout(() => {
            // Final values (initial state before animation begins).
            const finalFontSizeVW = 7;                    // Final font size in vw.
            const finalFontSizePX = 75;                   // Final font size in px.
            const initialFontSize = 0;                    // Starting point for font size (transition from 0).
            const initialOpacity = 0;                     // Starting point for opacity (transition from 0).
            const finalOpacity = 1;                       // Final opacity (fully visible).
            const finalLineHeightVW = 8;                  // Final line height in vw.
            const finalLineHeightPX = 95;                 // Final line height in px.
            const initialLineHeight = 0;                  // Starting point for line height (transition from 0).

            // Duration of animation in seconds
            const duration = 0.5;   // 0.5 seconds to animate the properties.
            const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
            let step = 0;           // Track the progress of the animation.

            // Start animation by gradually changing the properties over time.
            const animationInterval = setInterval(() => {
                let progress = step / steps; // progress value from 0 to 1.

                // Calculate the updated opacity (from 0 to 1).
                const updatedOpacity = initialOpacity + progress * (finalOpacity - initialOpacity);

                // Calculate font size dynamically (transition from 0 to final size).
                const vwFontSize = initialFontSize + (progress * (finalFontSizeVW - initialFontSize));
                const pxFontSize = initialFontSize + (progress * (finalFontSizePX - initialFontSize));
                const updatedFontSize = Math.max(vwFontSize * (window.innerWidth / 100), pxFontSize); // Adjust max(0, 75px)

                // Calculate line height dynamically (transition from 0 to final size).
                const vwLineHeight = initialLineHeight + (progress * (finalLineHeightVW - initialLineHeight));
                const pxLineHeight = initialLineHeight + (progress * (finalLineHeightPX - initialLineHeight));
                const updatedLineHeight = Math.max(vwLineHeight * (window.innerWidth / 100), pxLineHeight); // Adjust max(0, 95px)

                // Apply the updated values to the elements.
                titleTextUp.style.fontSize = `${updatedFontSize}px`;
                titleTextUp.style.opacity = updatedOpacity.toFixed(2);
                titleTextUp.style.lineHeight = `${updatedLineHeight}px`;

                titleTextDown.style.fontSize = `${updatedFontSize}px`;
                titleTextDown.style.opacity = updatedOpacity.toFixed(2);
                titleTextDown.style.lineHeight = `${updatedLineHeight}px`;

                // Increment the step to move to the next frame.
                step++;

                // If animation is interrupted by scrolling, go do the main animations.
                if (window.scrollY != 0) {
                    mainAnimations();
                    clearInterval(animationInterval);
                }

                // Stop the animation after the set number of steps
                if (step >= steps) {
                    // If animation is interrupted by scrolling, go do the main animations.
                    if (window.scrollY != 0) {
                        mainAnimations();
                    }
                    else {
                        // Final step - explicitly set the values to ensure precision.
                        titleTextUp.style.opacity = "1";
                        titleTextUp.style.fontSize = `${Math.max(7 * (window.innerWidth / 100), 75)}px`;
                        titleTextUp.style.lineHeight = `${Math.max(8 * (window.innerWidth / 100), 95)}px`;

                        titleTextDown.style.opacity = "1";
                        titleTextDown.style.fontSize = `${Math.max(7 * (window.innerWidth / 100), 75)}px`;
                        titleTextDown.style.lineHeight = `${Math.max(8 * (window.innerWidth / 100), 95)}px`;
                    }
                    clearInterval(animationInterval);
                }
            // Set the interval based on the duration and frame count.
            }, duration * 1000 / steps);  
        // Delay before starting the animation (10ms).
        }, 10);
    }
}

// Function for title text appearing and growing to it's final size for Mobile version.
function titleTextPageLoadMobile() {

    // Find the elements needed to be animated.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");

    // Check to ensure no glitch where title text loads twice if scrolled or resized before first load.
    if (titleTextUp.style.opacity != "1" || titleTextDown.style.opacity != "1") {

        // Ensure initial styles for smooth transition (in case they are not set).
        titleTextUp.style.opacity = "0";
        titleTextUp.style.fontSize = "0px";
        titleTextUp.style.lineHeight = "0px";
        titleTextDown.style.opacity = "0";
        titleTextDown.style.fontSize = "0px";
        titleTextDown.style.lineHeight = "0px";

        // Set a delay of 0.5 seconds before starting the animation.
        setTimeout(() => {
            // Final values (initial state before animation begins).
            const finalFontSizeVW = 12.5;                 // Final font size in vw.
            const initialFontSize = 0;                    // Starting point for font size (transition from 0).
            const initialOpacity = 0;                     // Starting point for opacity (transition from 0).
            const finalOpacity = 1;                       // Final opacity (fully visible).
            const finalLineHeightVW = 15;                 // Final line height in vw.
            const initialLineHeight = 0;                  // Starting point for line height (transition from 0).

            // Duration of animation in seconds
            const duration = 0.5;   // 0.5 seconds to animate the properties.
            const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
            let step = 0;           // Track the progress of the animation.

            // Start animation by gradually changing the properties over time.
            const animationInterval = setInterval(() => {
                let progress = step / steps; // progress value from 0 to 1.

                // Calculate the updated opacity (from 0 to 1).
                const updatedOpacity = initialOpacity + progress * (finalOpacity - initialOpacity);

                // Calculate font size dynamically (transition from 0 to final size).
                const updatedFontSize = (initialFontSize + (progress * (finalFontSizeVW - initialFontSize))) * (window.innerWidth / 100);

                // Calculate line height dynamically (transition from 0 to final size).
                const updatedLineHeight = (initialLineHeight + (progress * (finalLineHeightVW - initialLineHeight))) * (window.innerWidth / 100);

                // Apply the updated values to the elements.
                titleTextUp.style.fontSize = `${updatedFontSize}px`;
                titleTextUp.style.opacity = updatedOpacity.toFixed(2);
                titleTextUp.style.lineHeight = `${updatedLineHeight}px`;

                titleTextDown.style.fontSize = `${updatedFontSize}px`;
                titleTextDown.style.opacity = updatedOpacity.toFixed(2);
                titleTextDown.style.lineHeight = `${updatedLineHeight}px`;

                // Increment the step to move to the next frame.
                step++;

                // If animation is interrupted by scrolling, go do the main animations.
                if (window.scrollY != 0) {
                    mainAnimations();
                    clearInterval(animationInterval);
                }

                // Stop the animation after the set number of steps
                if (step >= steps) {
                    // If animation is interrupted by scrolling, go do the main animations.
                    if (window.scrollY != 0) {
                        mainAnimations();
                    }
                    else {
                        // Final step - explicitly set the values to ensure precision.
                        titleTextUp.style.opacity = "1";
                        titleTextUp.style.fontSize = `12.5vw`;
                        titleTextUp.style.lineHeight = `15vw`;

                        titleTextDown.style.opacity = "1";
                        titleTextDown.style.fontSize = `12.5vw`;
                        titleTextDown.style.lineHeight = `15vw`;
                    }
                    clearInterval(animationInterval);
                }
            // Set the interval based on the duration and frame count.
            }, duration * 1000 / steps);  
        // Delay before starting the animation (10ms).
        }, 10);

    }

}

// Function for title text appearing and growing to it's final size for both versions in a single function.
function titleTextPageLoad() {
    // Desktop version.
    if (window.innerWidth > 600 && window.scrollY == 0) {
        titleTextPageLoadDesktop();
    }

    // Mobile version.
    else if (window.innerWidth <= 600 && window.scrollY == 0) {
        titleTextPageLoadMobile();
    }
}

// Function for a navbar button appearing and growing to it's final size given the buttonID for Desktop version.
function navbarButtonPageLoadDesktop(buttonID, imageID) {

    // Find the elements needed to be animated.
    const navbarButton = document.getElementById(buttonID);

    // This check avoids a glitch where a user scrolls before or during the title text loading sequence and then goes back up. The navbar buttons then seem to flash in and out of display.
    if (navbarButton.style.display != "inline") {

        // Ensure initial styles for smooth transition (in case they are not set).
        navbarButton.style.opacity = "0";
        navbarButton.style.fontSize = "0px";
        navbarButton.style.height = "0px";
        navbarButton.style.width = "0px";
        navbarButton.style.minHeight = "0px";
        navbarButton.style.minWidth = "0px";
        navbarButton.style.outlineWidth = "0px";
        navbarButton.style.marginLeft = "0px";
        navbarButton.style.marginRight = "0px";
        navbarButton.style.display = "inline";

        let lastWidth = window.innerWidth;      // Store the initial width for resize detection.
        let lastHeight = window.innerHeight;    // Store the initial height for resize detection.

        // Set a delay of 0.5 seconds before starting the animation.
        setTimeout(() => {
            // Final values (initial state before animation begins).
            const initialOpacity = 0;                       // Starting point for opacity (transition from 0).
            const finalOpacity = 1;                         // Final opacity (fully visible).
            const finalFontSizeVW = 1.2;                    // Final font size in vw.
            const finalFontSizePX = 12;                     // Final font size in px.
            const initialFontSize = 0;                      // Starting point for font size (transition from 0).
            const finalHeight = 4;                          // Final height in vw.
            const initialHeight = 0;                        // Starting point for height (transition from 0).
            const finalMinHeight = 45;                      // Final minimum height in px.
            const initialMinHeight = 0;                     // Starting point for minimum height (transition from 0).
            const finalOutlineWidth = 2;                    // Final outline width in px.
            const initialOutlineWidth = 0;                  // Starting point for outline width (transition from 0).
            const finalWidth = 8;                           // Final width in vw.
            const initialWidth = 0;                         // Starting point for width (transition from 0).
            const finalMinWidth = 75;                       // Final minimum width in px.
            const initialMinWidth = 0;                      // Starting point for minimum width (transition from 0).
            const initialMargin = 0;                        // Starting point for margin (transition from 0).
            const finalMargin = 1.25;                       // Final margin in vw.

            // Duration of animation in seconds
            const duration = 0.5;   // 0.5 seconds to animate the properties.
            const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
            let step = 0;           // Track the progress of the animation.

            // Start animation by gradually changing the properties over time.
            const animationInterval = setInterval(() => {
                let progress = step / steps; // progress value from 0 to 1.

                // Check if the window size has changed (resize detection).
                if (window.innerWidth !== lastWidth || window.innerHeight !== lastHeight) {

                    // If resized, stop the animation and reset styles.
                    clearInterval(animationInterval);

                    // Reset styles immediately
                    navbarButtonSetDefaultsToAll();

                    // Exit the animation loop.
                    return; 
                }

                // Calculate the updated opacity (from 0 to 1).
                const updatedOpacity = initialOpacity + progress * (finalOpacity - initialOpacity);

                // Calculate font size dynamically (transition from 0 to final size).
                const vwFontSize = initialFontSize + (progress * (finalFontSizeVW - initialFontSize));
                const pxFontSize = initialFontSize + (progress * (finalFontSizePX - initialFontSize));
                const updatedFontSize = Math.max(vwFontSize * (window.innerWidth / 100), pxFontSize); // Adjust max(0, 75px)

                // Calculate the updated height.
                const updatedHeight = (initialHeight + progress * (finalHeight - initialHeight)) * (window.innerWidth / 100);

                // Calculate the updated height.
                const updatedMinHeight = initialMinHeight + progress * (finalMinHeight - initialMinHeight);

                // Calculate the updated outline width.
                const updatedOutlineWidth = initialOutlineWidth + progress * (finalOutlineWidth - initialOutlineWidth);

                // Calculate the updated width.
                const updatedWidth = (initialWidth + progress * (finalWidth - initialWidth)) * (window.innerWidth / 100);

                // Calculate the updated minimum width.
                const updatedMinWidth = initialMinWidth + progress * (finalMinWidth - initialMinWidth);
                
                // Calculate the updated margin.
                const updatedMargin = initialMargin + progress * (finalMargin - initialMargin);

                // Apply the updated values to the elements.
                navbarButton.style.fontSize = `${updatedFontSize}px`;
                navbarButton.style.opacity = updatedOpacity.toFixed(2);
                navbarButton.style.height = `${updatedHeight}px`;
                navbarButton.style.minHeight = `${updatedMinHeight}px`;
                navbarButton.style.outlineWidth = `${updatedOutlineWidth}px`;
                navbarButton.style.width = `${updatedWidth}px`;
                navbarButton.style.minWidth = `${updatedMinWidth}px`;
                navbarButton.style.marginLeft = `${updatedMargin}vw`;
                navbarButton.style.marginRight = `${updatedMargin}vw`;

                // Increment the step to move to the next frame.
                step++;

                // Stop the animation after the set number of steps
                if (step >= steps) {

                    // Final step - explicitly set the values to ensure precision.
                    navbarButton.style.opacity = "1";
                    navbarButton.style.fontSize = `${Math.max(1.2 * (window.innerWidth / 100), 12)}px`;
                    navbarButton.style.height = `${4 * (window.innerWidth / 100)}px`;
                    navbarButton.style.minHeight = "45px";
                    navbarButton.style.outlineWidth = "2px";
                    navbarButton.style.width = `${8 * (window.innerWidth / 100)}px`;
                    navbarButton.style.minWidth = "75px";
                    navbarButton.style.marginLeft = "1.25vw";
                    navbarButton.style.marginRight = "1.25vw";

                    clearInterval(animationInterval);
                }
            // Set the interval based on the duration and frame count.
            }, duration * 1000 / steps);  
        // Delay before starting the animation (10ms).
        }, 10);
    
    }

}

// Function for a navbar button appearing and growing to it's final size given the buttonID for Mobile version.
function navbarButtonPageLoadMobile(buttonID, imageID) {

    // Find the elements needed to be animated.
    const navbarButton = document.getElementById(buttonID);
    const navbarImage = document.getElementById(imageID);

     // This check avoids a glitch where a user scrolls before or during the title text loading sequence and then goes back up. The navbar buttons then seem to flash in and out of display.
    if (navbarButton.style.display != "inline") {
        // Ensure initial styles for smooth transition (in case they are not set).
        navbarButton.style.opacity = "0";
        navbarButton.style.height = "0px";
        navbarButton.style.width = "0px";
        navbarButton.style.outlineWidth = "0px";
        navbarButton.style.marginLeft = "0px";
        navbarButton.style.marginRight = "0px";
        navbarImage.style.opacity = "0";
        navbarImage.style.height = "0px";
        navbarImage.style.width = "0px";
        navbarButton.style.display = "inline";

        let lastWidth = window.innerWidth;      // Store the initial width for resize detection.
        let lastHeight = window.innerHeight;    // Store the initial height for resize detection.

        // Set a delay of 0.25 seconds before starting the animation.
        setTimeout(() => {
            // Final values (initial state before animation begins).
            const initialOpacity = 0;                       // Starting point for opacity (transition from 0).
            const finalOpacity = 1;                         // Final opacity (fully visible).
            const finalHeight = 12.5;                       // Final height in vw.
            const initialHeight = 0;                        // Starting point for height (transition from 0).
            const finalWidth = 12.5;                        // Final width in vw.
            const initialWidth = 0;                         // Starting point for width (transition from 0).
            const finalOutlineWidth = 2;                    // Final outline width in px.
            const initialOutlineWidth = 0;                  // Starting point for outline width (transition from 0).
            const finalMargin = 1.25;                       // Final margin in vw.
            const initialMargin = 0;                        // Starting point for margin (transition from 0).
            const finalImageHeight = 7.5;                   // Final image height in vw.
            const initialImageHeight = 0;                   // Starting point for image height (transition from 0).
            const finalImageWidth = 7.5;                    // Final image width in vw.
            const initialImageWidth = 0;                    // Starting point for image width (transition from 0).

            // Duration of animation in seconds
            const duration = 0.25;   // 0.25 seconds to animate the properties.
            const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
            let step = 0;           // Track the progress of the animation.

            // Start animation by gradually changing the properties over time.
            const animationInterval = setInterval(() => {
                let progress = step / steps; // progress value from 0 to 1.

                // Check if the window size has changed (resize detection).
                if (window.innerWidth !== lastWidth || window.innerHeight !== lastHeight) {

                    // If resized, stop the animation and reset styles.
                    clearInterval(animationInterval);

                    // Reset styles immediately.
                    navbarButtonSetDefaultsToAll();
                    
                    // Exit the animation loop.
                    return; 
                }

                // Calculate the updated opacity (from 0 to 1).
                const updatedOpacity = initialOpacity + progress * (finalOpacity - initialOpacity);

                // Calculate the updated height.
                const updatedHeight = (initialHeight + progress * (finalHeight - initialHeight)) * (window.innerWidth / 100);

                // Calculate the updated width.
                const updatedWidth = (initialWidth + progress * (finalWidth - initialWidth)) * (window.innerWidth / 100);

                // Calculate the updated outline width.
                const updatedOutlineWidth = initialOutlineWidth + progress * (finalOutlineWidth - initialOutlineWidth);

                // Calculate the updated margin.
                const updatedMargin = initialMargin + progress * (finalMargin - initialMargin);

                // Calculate the updated image height.
                const imageHeight = (initialImageHeight + progress * (finalImageHeight - initialImageHeight)) * (window.innerWidth / 100);

                // Calculate the updated image width.
                const imageWidth = (initialImageWidth + progress * (finalImageWidth - initialImageWidth)) * (window.innerWidth / 100);

                // Apply the updated values to the elements.
                navbarButton.style.opacity = updatedOpacity.toFixed(2);
                navbarButton.style.height = `${updatedHeight}px`;
                navbarButton.style.width = `${updatedWidth}px`;
                navbarButton.style.outlineWidth = `${updatedOutlineWidth}px`;
                navbarButton.style.marginLeft = `${updatedMargin}vw`;
                navbarButton.style.marginRight = `${updatedMargin}vw`;
                navbarImage.style.opacity = updatedOpacity.toFixed(2);
                navbarImage.style.height = `${imageHeight}px`;
                navbarImage.style.width = `${imageWidth}px`;

                // Increment the step to move to the next frame.
                step++;

                // Stop the animation after the set number of steps
                if (step >= steps) {
                    navbarButton.style.opacity = "1";
                    navbarButton.style.height = `${12.5 * (window.innerWidth / 100)}px`;
                    navbarButton.style.width = `${12.5 * (window.innerWidth / 100)}px`;
                    navbarButton.style.outlineWidth = "2px";
                    navbarButton.style.marginLeft = "1.25vw";
                    navbarButton.style.marginRight = "1.25vw";
                    navbarImage.style.opacity = "1";
                    navbarImage.style.height = `${7.5 * (window.innerWidth / 100)}px`;
                    navbarImage.style.width = `${7.5 * (window.innerWidth / 100)}px`;

                    clearInterval(animationInterval);
                }
            // Set the interval based on the duration and frame count.
            }, duration * 1000 / steps);  
        // Delay before starting the animation (10ms).
        }, 10);
    
    }

}

// Function to reset to default styles
const handleNavbarButtonScrollOrResize = () => {
    if (!isScrolling && !isResizing) {
        // Mark the event type and clear the timeouts
        if (isScrolling) {
            isScrolling = true;
        } else if (isResizing) {
            isResizing = true;
        }
        // Call reset function to stop animations and clear timeouts
        navbarButtonSetDefaultsToAll(); 
        
        // Clear all scheduled timeouts
        navbarButtonTimeoutIDs.forEach(navbarButtonTimeoutID => clearTimeout(navbarButtonTimeoutID));
        navbarButtonTimeoutIDs = []; // Reset the timeout IDs array
    }
};

// Function for the navbar button animation load sequence
function navbarButtonPageLoad() {
    // If the page is scrolled, set the default styles for all buttons
    if (window.scrollY !== 0) {
        navbarButtonSetDefaultsToAll();
    }
    else {
        // Desktop version
        if (window.innerWidth > 600) {
            let currentTimeout = setTimeout(() => {
                navbarButtonPageLoadDesktop("about_navbar_button", "about_navbar_image");
            }, 500);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadDesktop("experience_navbar_button", "experience_navbar_image");
            }, 1000);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadDesktop("projects_navbar_button", "projects_navbar_image");
            }, 1500);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadDesktop("blog_navbar_button", "blog_navbar_image");
            }, 2000);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadDesktop("contact_navbar_button", "contact_navbar_image");
            }, 2500);
            navbarButtonTimeoutIDs.push(currentTimeout);
        }

        // Mobile version
        else {
            let currentTimeout = setTimeout(() => {
                navbarButtonPageLoadMobile("about_navbar_button", "about_navbar_image");
            }, 500);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadMobile("experience_navbar_button", "experience_navbar_image");
            }, 1000);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadMobile("projects_navbar_button", "projects_navbar_image");
            }, 1500);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadMobile("blog_navbar_button", "blog_navbar_image");
            }, 2000);
            navbarButtonTimeoutIDs.push(currentTimeout);

            currentTimeout = setTimeout(() => {
                navbarButtonPageLoadMobile("contact_navbar_button", "contact_navbar_image");
            }, 2500);
            navbarButtonTimeoutIDs.push(currentTimeout);
        }
    }
}


// Function for about section image appearing and growing to it's final size for Desktop version.
function aboutImagePageLoadDesktop() {

    // Find the elements needed to be animated.
    const aboutSectionImage = document.getElementById("about_section_image");

    // Ensure initial styles for smooth transition (in case they are not set).
    aboutSectionImage.style.width = "0vw";
    aboutSectionImage.style.minWidth = "0px";
    aboutSectionImage.style.marginLeft = "12.5vw";
    aboutSectionImage.style.marginTop = "12.5vw";
    aboutSectionImage.style.outlineWidth = "0px";


    // Set a delay of 0.5 seconds before starting the animation.
    setTimeout(() => {
        // Final values (initial state before animation begins).
        const finalWidth = 25;                      // in vw.
        const initialWidth = 0;                     // in vw.
        const finalMinWidth = 229.2;                // in px.
        const initialMinWidth = 0;                  // in px.
        const initialMarginLeft = 12.5;             // in vw.
        const finalMarginLeft = 0;                  // in vw.
        const initialMarginTop = 12.5;              // in vw.
        const finalMarginTop = 0;                   // in vw.
        const initialOutlineWidth = 0;              // in px.
        const finalOutlineWidth = 2;                // in px.


        // Duration of animation in seconds
        const duration = 0.5;   // 0.5 seconds to animate the properties.
        const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
        let step = 0;           // Track the progress of the animation.

        // Start animation by gradually changing the properties over time.
        const animationInterval = setInterval(() => {
            let progress = step / steps; 

            // Calculate the updated minimum width.
            const updatedMinWidth = initialMinWidth + progress * (finalMinWidth - initialMinWidth);

            // Calculate width dynamically (transition from 0 to final size).
            const updatedWidth = (initialWidth + (progress * (finalWidth - initialWidth))) * (window.innerWidth / 100);

            // Calculate margin left dynamically (transition from 12.5 to 0).
            const updatedMarginLeft = initialMarginLeft - progress * (initialMarginLeft - finalMarginLeft);

            // Calculate margin top dynamically (transition from 12.5 to 0).
            const updatedMarginTop = initialMarginTop - progress * (initialMarginTop - finalMarginTop);

            // Calculate outline width dynamically (transition from 0 to 2).
            const updatedOutlineWidth = initialOutlineWidth + progress * (finalOutlineWidth - initialOutlineWidth);

            // Apply the updated values to the elements.
            aboutSectionImage.style.width = `${updatedWidth}px`;
            aboutSectionImage.style.minWidth = `${updatedMinWidth}px`;
            aboutSectionImage.style.marginLeft = `${updatedMarginLeft}vw`;
            aboutSectionImage.style.marginTop = `${updatedMarginTop}vw`;
            aboutSectionImage.style.outlineWidth = `${updatedOutlineWidth}px`;

            // Increment the step to move to the next frame.
            step++;

            // Stop the animation after the set number of steps
            if (step >= steps) {
                
                // Final step - explicitly set the values to ensure precision.
                aboutSectionImage.style.width = "25vw";
                aboutSectionImage.style.minWidth = "229.2px";
                aboutSectionImage.style.marginLeft = "0vw";
                aboutSectionImage.style.marginTop = "0vw";
                aboutSectionImage.style.outlineWidth = "2px";

                clearInterval(animationInterval);
            }
        // Set the interval based on the duration and frame count.
        }, duration * 1000 / steps);  
    // Delay before starting the animation (10ms).
    }, 10);

}

// Function for about section image appearing and growing to it's final size for Mobile version.
function aboutImagePageLoadMobile() {

    // Find the elements needed to be animated.
    const aboutSectionImage = document.getElementById("about_section_image");

    // Ensure initial styles for smooth transition (in case they are not set).
    aboutSectionImage.style.width = "0vw";
    aboutSectionImage.style.marginLeft = "40vw";
    aboutSectionImage.style.marginTop = "40vw";
    aboutSectionImage.style.outlineWidth = "0px";


    // Set a delay of 0.5 seconds before starting the animation.
    setTimeout(() => {
        // Final values (initial state before animation begins).
        const finalWidth = 80;                      // in vw.
        const initialWidth = 0;                     // in vw.
        const initialMarginLeft = 40;               // in vw.
        const finalMarginLeft = 2.5;                // in vw.
        const initialMarginTop = 40;                // in vw.
        const finalMarginTop = 5;                   // in vw.
        const initialOutlineWidth = 0;              // in px.
        const finalOutlineWidth = 2;                // in px.


        // Duration of animation in seconds
        const duration = 0.5;   // 0.5 seconds to animate the properties.
        const steps = 60;       // 60 steps for the animation (1 step per frame at 60fps).
        let step = 0;           // Track the progress of the animation.

        // Start animation by gradually changing the properties over time.
        const animationInterval = setInterval(() => {
            let progress = step / steps; 

            // Calculate width dynamically (transition from 0 to final size).
            const updatedWidth = (initialWidth + (progress * (finalWidth - initialWidth))) * (window.innerWidth / 100);

            // Calculate margin left dynamically (transition from 12.5 to 0).
            const updatedMarginLeft = initialMarginLeft - progress * (initialMarginLeft - finalMarginLeft);

            // Calculate margin top dynamically (transition from 12.5 to 0).
            const updatedMarginTop = initialMarginTop - progress * (initialMarginTop - finalMarginTop);

            // Calculate outline width dynamically (transition from 0 to 2).
            const updatedOutlineWidth = initialOutlineWidth + progress * (finalOutlineWidth - initialOutlineWidth);

            // Apply the updated values to the elements.
            aboutSectionImage.style.width = `${updatedWidth}px`;
            aboutSectionImage.style.marginLeft = `${updatedMarginLeft}vw`;
            aboutSectionImage.style.marginTop = `${updatedMarginTop}vw`;
            aboutSectionImage.style.outlineWidth = `${updatedOutlineWidth}px`;

            // Increment the step to move to the next frame.
            step++;

            // Stop the animation after the set number of steps
            if (step >= steps) {
                
                // Final step - explicitly set the values to ensure precision.
                aboutSectionImage.style.width = "80vw";
                aboutSectionImage.style.marginLeft = "2.5vw";
                aboutSectionImage.style.marginTop = "5vw";
                aboutSectionImage.style.outlineWidth = "2px";

                clearInterval(animationInterval);
            }
        // Set the interval based on the duration and frame count.
        }, duration * 1000 / steps);  
    // Delay before starting the animation (10ms).
    }, 10);

}

// Function for about section image appearing and growing to it's final size for both versions in a single function.
function aboutImagePageLoad() {
    
    // Desktop version
    if (window.innerWidth > 600) {
        aboutImagePageLoadDesktop();
    }

    // Mobile version
    else {
        aboutImagePageLoadMobile();
    }

}

// Function to control resizing behaviour for About section image for Desktop version.
function adjustOnResizeAboutSectionImageDesktop() {
    
    // Find the elements needed to be modified on resizing.
    const aboutSectionImage = document.getElementById("about_section_image");

    // Apply dynamic font size to title text.
    aboutSectionImage.style.width = "25vw";
    aboutSectionImage.style.minWidth = "229.2px";
    aboutSectionImage.style.marginLeft = "0vw";
    aboutSectionImage.style.marginTop = "0vw";
    aboutSectionImage.style.outlineWidth = "2px";

    // Clear the existing timeout to prevent resetting transition prematurely.
    clearTimeout(isScrollingorResizingTimeout);

    // Restore transition after resize stops.
    isScrollingorResizingTimeout = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Function to control resizing behaviour for About section image for Desktop version.
function adjustOnResizeAboutSectionImageMobile() {
    
    // Find the elements needed to be modified on resizing.
    const aboutSectionImage = document.getElementById("about_section_image");

    // Apply dynamic font size to title text.
    aboutSectionImage.style.width = "80vw";
    aboutSectionImage.style.minWidth = "0px";
    aboutSectionImage.style.marginLeft = "2.5vw";
    aboutSectionImage.style.marginTop = "5vw";
    aboutSectionImage.style.outlineWidth = "2px";

    // Clear the existing timeout to prevent resetting transition prematurely.
    clearTimeout(isScrollingorResizingTimeout);

    // Restore transition after resize stops.
    isScrollingorResizingTimeout = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Function to check if About section image is resizing alright.
function checkResizeAboutSectionImage() {

    // Desktop version.
    if (window.innerWidth > 600) {
        // Attach resize event listeners.
        window.removeEventListener("resize", adjustOnResizeAboutSectionImageMobile);
        window.addEventListener("resize", adjustOnResizeAboutSectionImageDesktop);
        adjustOnResizeAboutSectionImageDesktop();
    }

    // Mobile version. 
    else {
        // Attach resize event listeners.
        window.removeEventListener("resize", adjustOnResizeAboutSectionImageDesktop);
        window.addEventListener("resize", adjustOnResizeAboutSectionImageMobile);
        adjustOnResizeAboutSectionImageMobile();
    } 

}

// Function for generally creating a typewriter effect for some text and some elementID in which that text goes when the page loads.
function typewriterText(text, elementID, typeSpeed = 100, scrollUp = 20, typeIndex = 0, typePosition = 0, maxTypeSpeed = 5) {
    var typeContents = '';
    var typeRow = Math.max(0, typeIndex - scrollUp);
    var element = document.getElementById(elementID);

    // Add all lines up to the current line being typed.
    while (typeRow < typeIndex) {
        typeContents += text[typeRow++] + '<br />';
    }

    // Ensure `text[typeIndex]` is valid before accessing substring.
    if (text[typeIndex]) {
        // Add the current line with the underscore (`_`) while typing.
        element.innerHTML = typeContents + text[typeIndex].substring(0, typePosition) + "_";

        // Use the faster typing speed if flag is set, otherwise use the normal typeSpeed
        const currentTypingSpeed = isTypingFaster ? maxTypeSpeed : typeSpeed;
        const currentNewlineSpeed = isTypingFaster ? maxTypeSpeed : 500;

        // Listen for tab switching or screen clicks to speed up typing.
        const handleVisibilityChange = () => {
            if (document.hidden && !isTypingFaster) {
                isTypingFaster = true;  // Set flag to use faster speed.
            }
        };
      
        const handleClick = () => {
            if (!isTypingFaster) {
                isTypingFaster = true;  // Set flag to use faster speed.
            }
        };

        const handleTouchStart = () => {
            if (!isTypingFaster) {
                isTypingFaster = true;  // Set flag to use faster speed.
            }
        };

        const handleTouchMove = () => {
            if (!isTypingFaster) {
                isTypingFaster = true;  // Set flag to use faster speed.
            }
        };

        // Attach event listeners to detect tab switch or screen click.
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('click', handleClick);
        document.addEventListener('touchstart', handleTouchStart);  // Listen for touch start.
        document.addEventListener('touchmove', handleTouchMove);    // Listen for touch move (dragging/swiping).

        // If we've finished typing the line, remove the underscore and move to the next line.
        if (typePosition++ === text[typeIndex].length) {
            setTimeout(function() {
                element.innerHTML = typeContents + text[typeIndex];
                typePosition = 0;
                typeIndex++;

                // Clean up event listeners once typing for the current line is finished.
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                document.removeEventListener('click', handleClick);
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);

                // Continue to the next line after a small delay.
                if (typeIndex < text.length) {
                    setTimeout(function() {
                        typewriterText(text, elementID, typeSpeed, scrollUp, typeIndex, typePosition, maxTypeSpeed);  // Recursive call.
                    }, currentNewlineSpeed);
                }

            }, currentNewlineSpeed);
        } 
        
        // Continue typing the current line with updated typing speed.
        else {
            setTimeout(function() {
                typewriterText(text, elementID, typeSpeed, scrollUp, typeIndex, typePosition, maxTypeSpeed);  // Recursive call.
            }, currentTypingSpeed);
        }
    }
}

// An animation that causes random flickering of a glowing title text.
function randomFlicker(element_ids) {

    // Define base minimum and maximum range for the flicker interval.
    var baseMinRange = 2000;
    var baseMaxRange = 4000;
  
    // Define additional random range that will be added to the base interval.
    var randomMinRange = -500;
    var randomMaxRange = 500;

    // Calculate a base interval value by picking a random number within the base range.
    var baseInterval = Math.floor(Math.random() * (baseMaxRange - baseMinRange + 1) - baseMinRange);

    // Calculate a random interval by adding an additional random value to the base interval.
    var randomInterval = baseInterval + Math.floor(Math.random() * (randomMaxRange - randomMinRange + 1) - randomMinRange);
  
    // Iterate over each element_id passed to the function.
    element_ids.forEach(element_id => {
        // Get the element by its ID and set the flicker interval via a CSS custom property.
        const element = document.getElementById(element_id);
        element.style.setProperty('--interval', `${randomInterval}ms`);

        // Ensure the interval is adjusted each time the animation completes.
        element.addEventListener('animationiteration', () => {
            // Calculate a new random interval after the animation iteration ends.
            var randomInterval = baseInterval + Math.floor(Math.random() * (randomMaxRange - randomMinRange + 1) - randomMinRange);

            // Iterate over all elements again to adjust their flicker intervals.
            element_ids.forEach(element_id => {
                const element = document.getElementById(element_id);
                element.style.setProperty('--interval', `${randomInterval}ms`);
            });
        });

        // Fallback for older WebKit browsers.
        element.addEventListener('webkitAnimationIteration', () => {
            // Calculate a new random interval after the animation iteration ends.
            var randomInterval = baseInterval + Math.floor(Math.random() * (randomMaxRange - randomMinRange + 1) - randomMinRange);

            // Iterate over all elements again to adjust their flicker intervals.
            element_ids.forEach(element_id => {
                const element = document.getElementById(element_id);
                element.style.setProperty('--interval', `${randomInterval}ms`);
            });
        });

        // Fallback for older Firefox browsers
        element.addEventListener('mozAnimationIteration', () => {
            // Calculate a new random interval after the animation iteration ends.
            var randomInterval = baseInterval + Math.floor(Math.random() * (randomMaxRange - randomMinRange + 1) - randomMinRange);

            // Iterate over all elements again to adjust their flicker intervals.
            element_ids.forEach(element_id => {
                const element = document.getElementById(element_id);
                element.style.setProperty('--interval', `${randomInterval}ms`);
            });
        });
    });
}

// Function for a text scramble animation, to be applied to any element_id.
function textScrambleAnimation(element_id) {
    // Define the set of random characters for the scramble effect.
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // Define the pause time after each wave effect (3 seconds).
    const pauseTime = 3000;
    
    // Define the interval time for each character change (30ms).
    const scrambleSpeed = 30;
    
    // Get the target element by ID and its content.
    const element = document.getElementById(element_id);
    
    // Get the text from the element and remove any underscore (_) completely.
    const targetText = element.dataset.value || element.innerText;
    const sanitizedText = targetText.replace("_", "");  // Remove the underscore.
  
    // Start the animation loop.
    setInterval(() => {
        // Reset the iteration to start a new wave effect.
        let iteration = 0;
        
        // Start the scramble wave effect.
        const waveInterval = setInterval(() => {
            // Update the element's text by scrambling characters.
            element.innerText = sanitizedText
            .split("") // Split the text into individual characters.
            .map((letter, index) => {
                // If the current index is less than the iteration, keep the target letter.
                if (index < iteration) {
                    return sanitizedText[index];
                }
                
                // Otherwise, replace with a random character.
                return characters[Math.floor(Math.random() * 26)];
            })
            .join(""); // Join the array back into a string.
    
            // If all letters have been revealed, stop the scrambling effect.
            if (iteration >= sanitizedText.length) {
                clearInterval(waveInterval);
        
                // Show the original sanitized text (no underscore) for a 3-second pause.
                setTimeout(() => {
                    element.innerText = sanitizedText; // Reset the text to the version without underscore.
                }, pauseTime); // Pause duration: 3 seconds.
            }
    
            // Increment the iteration (slow reveal of the original text).
            iteration += 1 / 3;
        }, scrambleSpeed); // Scramble speed: 30ms per update.
  
    }, pauseTime + (sanitizedText.length * scrambleSpeed)); // Start the wave again after the pause time + wave duration.
}

// A function that slightly jiggles an image, drawing attention to it.
function jiggleImage(element_id) {
    // Get the image element by ID.
    var image = document.getElementById(element_id);

    // Define the pause time after each wave effect (3 seconds).
    const pauseTime = 3000;

    // Set the animation interval (runs every `pauseTime`).
    setInterval(function() {

        // Apply the first rotation to the left (-5deg).
        image.style.transition = 'transform 0.2s ease';  // Add a smooth transition for the rotation.
        image.style.transform = 'rotate(-2.5deg)';

        // After 100ms, rotate to the right (5deg).
        setTimeout(function() { 
            image.style.transform = 'rotate(2.5deg)'; 
        }, 100);

        // After another 100ms, return to the original position (0deg).
        setTimeout(function() { 
            image.style.transform = 'rotate(0deg)'; 
        }, 200);

    }, pauseTime);  // Repeat every 3 seconds.
}

// Function for all animations on page load.
function pageLoadAnimations() {

    // Declare the text for the about section heading.
    var aboutSectionHeadingText = new Array("About");
    
    // Declare the text for the about section content.
    var aboutSectionText = new Array(
        "Hello world! My name is Sambhav. I'm the human in the pic you just (hopefully) saw. My pronouns are he/him.",
        " ",
		"I'm an engineer and I have worked in comp. bio., medical devices, software dev. and chip design in the past.",
        " ",
		"I'm interested in neurotech., software, volunteering and working out. I also like to read a lot (especially philosophy) and learn new languages.",
		" ",		
        "Apart from all that I sketch stuff I find visually interesting, meditate and listen to german industrial metal.", 
        " ",
		"Hope you like my webpage!",
        " ", 
		"UwU"
    );

    // Event listeners for scroll and resize events to handle navbar button animations.
    window.addEventListener("scroll", handleNavbarButtonScrollOrResize);
    window.addEventListener("resize", handleNavbarButtonScrollOrResize);

    // Calculate timing delays for each loading animation.
    var load_time_1 = (window.scrollY != 0) ? 100 : 1000;
    var load_time_2 = (window.scrollY != 0) ? 100 : 500;
    var load_time_3 = 100;
    var load_time_4 = (window.scrollY != 0) ? 500 : 3000;
    var load_time_5 = 500;
    var load_time_6 = 500;


    // Create a timed series of animations for the page load.
    setTimeout(function() {

        titleNavbarPageLoad();

        setTimeout(function() {

            // Start the animations for making the title text appear and grow to its final size.
            titleTextPageLoad();
            setTimeout(function() {

                randomFlicker(['title_text_up', 'title_text_down']);

                // Start the animations for making the navbar buttons appear and grow to their final size.
                navbarButtonPageLoad();

                // Add an event listener for resizing the navbar buttons.
                window.addEventListener("resize", navbarButtonSetDefaultsToAll);

                setTimeout(function() {

                    // Ensure the navbar buttons are set to their default styles.
                    navbarButtonSetDefaultsToAll();

                    // Start the animations to type out the about section heading.
                    typewriterText(aboutSectionHeadingText, "about_section_heading"); 

                    setTimeout(function() {

                        // Start the animation to load the about section image.
                        aboutImagePageLoad();

                        // Add an event listener for resizing the about section image.
                        window.addEventListener("resize", checkResizeAboutSectionImage);
                        setTimeout(function() {

                            textScrambleAnimation('about_section_heading');
                            jiggleImage('about_section_image');

                            // Ensure the about section image is set to its default styles.
                            checkResizeAboutSectionImage();

                            // Start the animations to type out the about section text.
                            typewriterText(aboutSectionText, "about_section_text", typeSpeed = 50);
                        
                        }, load_time_6); 

                    }, load_time_5);

                }, load_time_4);

            }, load_time_3);

        }, load_time_2);

    },  load_time_1);

}

// Function to cycle the tab title with a typewriter effect.
function switchTitle() {
    const titles = ["𝚂𝚊𝚖𝚋𝚑𝚊𝚟 𝙼𝚊𝚝𝚝𝚘𝚘", "𝙴𝚗𝚐𝚒𝚗𝚎𝚎𝚛", "𝙲𝚑𝚒𝚙 𝙳𝚎𝚜𝚒𝚐𝚗", "𝙲𝚘𝚖𝚙𝚞𝚝𝚊𝚝𝚒𝚘𝚗𝚊𝚕 𝙱𝚒𝚘𝚕𝚘𝚐𝚢", "𝙽𝚎𝚞𝚛𝚘𝚝𝚎𝚌𝚑𝚗𝚘𝚕𝚘𝚐𝚢", "𝚂𝚘𝚏𝚝𝚠𝚊𝚛𝚎 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚖𝚎𝚗𝚝"];         // The array of titles to switch between.
    let titleIndex = 0;                                                                                                                                     // Index to keep track of the current word.
    let currentText = "";                                                                                                                                   // Current text that is being typed out.
    let typeIndex = 0;                                                                                                                                      // Index to track the position of the current word being typed.
    let typing = true;                                                                                                                                      // Flag to check if typing is in progress.
    let holdTime = 5000;                                                                                                                                    // Time to hold the full word before starting to delete.
    let holdTimeout;                                                                                                                                        // To store the timeout for holding the word.

    // Function to simulate typewriter effect.
    setInterval(() => {
        if (typing) {

            // Typing effect logic.
            if (typeIndex < titles[titleIndex].length) {
                currentText = titles[titleIndex].substring(0, typeIndex);   // Add one letter at a time.
                document.title = currentText + "_";                         // Update the title with the current typed text.
                typeIndex++;                                                // Move to the next letter in the word.
            }

            // Removing the cursor when the title is typed.
            else if (typeIndex == titles[titleIndex].length) {
                currentText = titles[titleIndex].substring(0, typeIndex);   // Add one letter at a time.
                document.title = currentText + " ";                         // Update the title with the current typed text.
                typeIndex++;                                                // Move to the next letter in the word.
            }

            // Once the full word is typed, set a timeout to hold the word for 3 seconds.
            else {
                if (!holdTimeout) {
                    holdTimeout = setTimeout(() => {
                        typing = false;                                     // Start the deleting phase after holding the word.
                        holdTimeout = null;                                 // Reset the timeout variable.
                    }, holdTime);                                           // Wait for 3 seconds before starting deletion.
                }
            }
        } 
        
        else {
            // Deleting effect logic.
            if (typeIndex > 0) {
                currentText = titles[titleIndex].substring(0, typeIndex);   // Remove one letter at a time.
                document.title = currentText + "_";                         // Update the title with the current text.
                typeIndex--;                                                // Move to the previous letter in the word.
            } 
            
            // Once the word is fully deleted, move to the next title.
            else {
                typing = true;                                              // Start typing the next word.
                titleIndex = (titleIndex + 1) % titles.length;              // Cycle to the next word.
                typeIndex = 0;                                              // Reset typeIndex for the next word.
                currentText = "_";                                          // Ensure the title is never empty by displaying a underscore.
                document.title = currentText;                               // Set the title to space before starting the next word.
            }
        }
    }, 300);    // Delay between each typing or deleting step to simulate the typewriter effect.
} 

// This function will cause scrolling to a specified div element on the page. 
function smoothScrollToDivElement(buttonId, targetId) {
    // Attach an event listener to the button.
    document.getElementById(buttonId).addEventListener('click', function (event) {

        // Prevent default button behavior.
        event.preventDefault();  
      
        // Get the target element to scroll to.
        const targetElement = document.getElementById(targetId);
      
        if (targetElement) {
            // Get the current height of the navbar dynamically by its ID.
            var navbarHeight = document.getElementById('navbar_clearance_block_relative').offsetHeight;

            // Calculate the top offset of the target element.
            var targetOffsetTop = targetElement.offsetTop;

            // Adjust the scroll position by subtracting the navbar height.
            var topValue = targetOffsetTop - navbarHeight;

            // Scroll to the target element.
            window.scrollTo({
                top: topValue,
                behavior: 'smooth'  // Enable smooth scrolling.
            });
        }

    });
}

// Ensure animations are only executed once the page is fully loaded.
document.addEventListener('DOMContentLoaded', function () {

    // Start the tab title cycling.
    switchTitle();

    // Start the animations which are launched on page load.
    window.addEventListener("load", pageLoadAnimations);

    // Event listeners for main animations to deal with scrolling or resizing.
    window.addEventListener("resize", mainAnimations);
    window.addEventListener("scroll", mainAnimations);

    // Event listeners for smooth scrolling to different sections.
    smoothScrollToDivElement('about_navbar_button', 'about_section');
});