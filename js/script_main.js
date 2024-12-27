// Variable for scrolling or resizing timeout.
let isScrollingorResizing;

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
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops.
    isScrollingorResizing = setTimeout(() => {
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
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops.
    isScrollingorResizing = setTimeout(() => {
    }, 100); // Small delay for smooth transition restoration
}

// Main function to launch any main .js animations. Divided for mobile and desktop versions.
function mainAnimations() {

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

// Function for title text appearing and growing to it's final size for Desktop version.
function titleTextPageLoadDesktop() {

    // Find the elements needed to be animated.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");

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

// Function for title text appearing and growing to it's final size for Mobile version.
function titleTextPageLoadMobile() {

    // Find the elements needed to be animated.
    const titleTextUp = document.getElementById("title_text_up");
    const titleTextDown = document.getElementById("title_text_down");

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
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops.
    isScrollingorResizing = setTimeout(() => {
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
    clearTimeout(isScrollingorResizing);

    // Restore transition after resize stops.
    isScrollingorResizing = setTimeout(() => {
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
function typewriterText(text, elementID, typeSpeed = 100, scrollUp = 20, typeIndex = 0, typePosition = 0) {
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
  
        // If we've finished typing the line, remove the underscore and move to the next line.
        if (typePosition++ == text[typeIndex].length) {
            setTimeout(function() {
            element.innerHTML = typeContents + text[typeIndex];
            typePosition = 0;
            typeIndex++;
            if (typeIndex < text.length) {
                // Continue to the next line after a small delay.
                setTimeout(function() {
                typewriterText(text, elementID, typeSpeed, scrollUp, typeIndex, typePosition);  // Recursive call.
                }, 500);
            }
            }, 500);
        } 
        
        // Continue typing the current line.
        else {
            setTimeout(function() {
                typewriterText(text, elementID, typeSpeed, scrollUp, typeIndex, typePosition);  // Recursive call.
            }, typeSpeed);
        }
    }
}

// Function for all animations on page load.
function pageLoadAnimations() {

    var aboutSectionHeadingText = new Array("About");
    
    var aboutSectionText = new Array(
        "Hello world! My name is Sambhav. I'm the human in the pic you just saw (@ 23 y.o. lulz).",
        " ",
		"I'm an engineer and I have worked in comp. bio., medical devices, software dev., chip design and automation in the past.",
        " ",
		"I'm interested in neurotech., indie game dev., volunteering and working out. I also like to read a lot (especially philosophy) and learn new languages.",
		" ",		
        "Apart from all that I sketch stuff I find visually interesting, meditate and listen to german industrial metal.", 
        " ",
		"Hope you like my webpage!",
        " ", 
		"UwU"
    );

    setTimeout(function() {
        titleTextPageLoad();
        setTimeout(function() {
            typewriterText(aboutSectionHeadingText, "about_section_heading"); 
            setTimeout(function() {
                aboutImagePageLoad();
                window.addEventListener("resize", checkResizeAboutSectionImage);
                setTimeout(function() {
                    checkResizeAboutSectionImage();
                    typewriterText(aboutSectionText, "about_section_text", typeSpeed = 50);
                }, 1000); 
            }, 1000);
        }, 1000);
    }, 500);
     

}

// This function will cause scrolling to a specified div element on the page. 
function smoothScrollToDivElement(buttonId, targetId) {
    // Attach an event listener to the button.
    document.getElementById(buttonId).addEventListener('click', function (event) {
        event.preventDefault();  // Prevent default button behavior
      
        // Get the target element to scroll to
        const targetElement = document.getElementById(targetId);
      
        if (targetElement) {
            // Get the current height of the navbar dynamically by its ID
            var navbarHeight = document.getElementById('navbar_clearance_block_relative').offsetHeight;
            console.log('navbarHeight:', navbarHeight);

            var targetOffsetTop = targetElement.offsetTop;
            console.log('targetOffsetTop:', targetOffsetTop);

            var topValue = targetOffsetTop - navbarHeight;
            console.log('topValue:', topValue);

            // Adjust the scroll position by subtracting the navbar height
            window.scrollTo({
                top: topValue,
                behavior: 'smooth'  // Enable smooth scrolling
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // Ensure pageLoadAnimations is only executed once the page is fully loaded.
    window.addEventListener("load", pageLoadAnimations);

    // Adjust animations on resize or scroll.
    window.addEventListener("resize", mainAnimations);
    window.addEventListener("scroll", mainAnimations);

    smoothScrollToDivElement('about_navbar_button', 'about_section');
});