"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Star as StarIcon, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Configuration object for the project
const config = {
  orgId: "your-org-id",
  projectId: "your-project-id",
  settings: {
    name: "francisco-herrera"
  }
};
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type FormEvent } from "react"
import { useLanguage } from "@/context/LanguageContext"
import LanguageToggle from "@/components/LanguageToggle"

// Testimonials data removed as per your code
// const testimonials = [ ... ];

export default function MarketingSection() {
  // Add language context
  const { t, language } = useLanguage()

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // --- State and Refs (Unchanged from your version) ---
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [concertInfoCollapsed, setConcertInfoCollapsed] = useState(true)
  const [eventDetailsCollapsed, setEventDetailsCollapsed] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const guitaristImgRef = useRef<HTMLImageElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const leftCardContentRef = useRef<HTMLDivElement>(null)
  const rightCardContentRef = useRef<HTMLDivElement>(null)
  const ticketButtonRef = useRef<HTMLAnchorElement>(null)
  const toggleButtonsRef = useRef<(HTMLButtonElement | HTMLDivElement | null)[]>([])
  const scrollButtonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const lastScrollAttemptRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);

  // --- Functions (Unchanged from your version) ---
  const scrollToElement = (elementId: string) => {
    if (typeof window === 'undefined') return; const element = document.getElementById(elementId);
    if (element) { const rect = element.getBoundingClientRect(); const scrollTop = window.pageYOffset || document.documentElement.scrollTop; const targetPosition = rect.top + scrollTop; window.scrollTo({ top: targetPosition, behavior: "smooth", }) }
  }
  const throttledScrollToTickets = (event?: React.MouseEvent) => {
    const now = Date.now(); if (isScrollingRef.current) { console.log("Scroll in progress - ignoring duplicate scroll request"); return; }
    if (now - lastScrollAttemptRef.current > 2000) { lastScrollAttemptRef.current = now; isScrollingRef.current = true; scrollToTickets(event); setTimeout(() => { isScrollingRef.current = false; }, 2500); } else { console.log("Scroll throttled - ignoring duplicate scroll request within 2 seconds"); }
  };
  const scrollToTickets = (event?: React.MouseEvent) => {
    if (typeof window !== 'undefined') { const heroSection = document.getElementById('reserve-tickets'); if (heroSection) { const rect = heroSection.getBoundingClientRect(); if (rect.top >= -100 && rect.top <= 150) { console.log("Already at tickets section - ignoring scroll request"); return; } } }
    if (event) { event.preventDefault(); } console.log("GUARANTEED SCROLL TO TICKETS SECTION"); if (typeof window === 'undefined') return;
    setTimeout(() => {
      const heroSection = document.getElementById('reserve-tickets'); if (!heroSection) { console.log("WARNING: Could not find #reserve-tickets section"); window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); setTimeout(() => { window.location.hash = 'reserve-tickets'; }, 100); return; }
      console.log("FOUND HERO SECTION, USING DIRECT APPROACH"); const rect = heroSection.getBoundingClientRect(); const scrollTop = window.pageYOffset || document.documentElement.scrollTop; const absoluteY = rect.top + scrollTop; window.scroll({ top: absoluteY - 50, behavior: 'smooth' }); setTimeout(() => { history.pushState(null, '', '#reserve-tickets'); }, 100); heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const shouldFocusInput = event && ((event as any)?.ticketButton === true || (event.target as HTMLElement)?.textContent?.toLowerCase().includes('ticket') || (event.target as HTMLElement)?.closest('[href="#reserve-tickets"]') !== null);
      if (shouldFocusInput) { setTimeout(() => { const formInput = heroSection.querySelector('input'); if (formInput) { formInput.focus({ preventScroll: true }); formInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; setTimeout(() => { formInput.style.backgroundColor = ''; }, 1000); } }, 800); }
      setTimeout(() => { const originalBg = heroSection.style.backgroundColor || ''; heroSection.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; setTimeout(() => { heroSection.style.backgroundColor = originalBg; }, 500); }, 800);
    }, 100);
  };
  const scrollToTop = () => { if (typeof window === 'undefined') return; window.scrollTo({ top: 0, behavior: "smooth", }); setTimeout(() => { history.pushState(null, '', window.location.pathname); }, 800); }
  const scrollToContent = () => { if (typeof window === 'undefined') return; scrollToElement("reserve-tickets") }

  // --- useEffects (Unchanged from your version, except the last one) ---
  useEffect(() => { // scroll/hash/anchor listener
    if (typeof window === 'undefined') return;
    const reserveTicketsSection = document.getElementById("reserve-tickets");
    if (reserveTicketsSection) {
      reserveTicketsSection.style.scrollMarginTop = "50px";
      (reserveTicketsSection.style as any).scrollSnapMarginTop = "50px";
      console.log("Applied scroll margin to reserve-tickets section");
      // DISABLED automatic scrolling on hash
      // if (window.location.hash === '#reserve-tickets') { 
      //   setTimeout(() => { 
      //     throttledScrollToTickets(); 
      //   }, 300); 
      // }
    }

    // DISABLED hash change handler
    const handleHashChange = () => {
      // Disabled automatic scrolling on hash change
      // if (window.location.hash === '#reserve-tickets') { 
      //   console.log("Hash changed to #reserve-tickets, ensuring scroll"); 
      //   setTimeout(() => { 
      //     throttledScrollToTickets(); 
      //   }, 100); 
      // } 
    };

    window.addEventListener('hashchange', handleHashChange);

    // DISABLED initial hash check
    // if (window.location.hash === '#reserve-tickets') { 
    //   handleHashChange(); 
    // }
    const handleScroll = () => { const scrollPosition = window.scrollY || document.documentElement.scrollTop; const shouldShowButtons = scrollPosition > 300; setShowScrollUp(shouldShowButtons); const scrollTopButton = scrollButtonsRef.current[0]; const scrollTicketsButton = scrollButtonsRef.current[1]; const updateButtonVisibility = (button: HTMLButtonElement | null, show: boolean) => { if (button) { button.style.display = show ? 'flex' : 'none'; button.style.opacity = show ? '1' : '0'; button.style.visibility = show ? 'visible' : 'hidden'; } }; updateButtonVisibility(scrollTopButton, shouldShowButtons); updateButtonVisibility(scrollTicketsButton, shouldShowButtons); }; window.addEventListener("scroll", handleScroll);
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // FIXED: Check if target supports closest() method
      const anchor = target && 'closest' in target ? target.closest('a[href^="#"]') : null;

      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#reserve-tickets") {
          e.preventDefault();
          scrollToTickets();
          return;
        }
        if (targetId && targetId !== "#") {
          e.preventDefault();
          const targetIdWithoutHash = targetId.slice(1);
          history.pushState(null, '', `#${targetIdWithoutHash}`);
          setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => { document.removeEventListener("click", handleAnchorClick); window.removeEventListener("scroll", handleScroll); window.removeEventListener('hashchange', handleHashChange); }
  }, [])
  useEffect(() => { // Mobile detection
    if (typeof window === 'undefined') return; const checkMobile = () => { setIsMobileView(window.innerWidth <= 640) }; checkMobile(); window.addEventListener('resize', checkMobile); return () => window.removeEventListener('resize', checkMobile)
  }, [])
  useEffect(() => { // Client-side mobile styling
    if (typeof window === 'undefined' || !isMobileView) return; const img = guitaristImgRef.current; if (img) { /* styles... */ } const leftContent = leftCardContentRef.current; if (leftContent) { /* styles... */ } const rightContent = rightCardContentRef.current; if (rightContent) { /* styles... */ } const leftCard = leftCardRef.current; if (leftCard) leftCard.style.display = 'none'; const rightCard = rightCardRef.current; if (rightCard) rightCard.style.display = 'none'; if (ticketButtonRef.current) { /* styles... */ } toggleButtonsRef.current.forEach(button => { /* styles... */ }); scrollButtonsRef.current.forEach(button => { /* styles... */ });
  }, [isMobileView]);
  const toggleConcertInfo = () => { if (typeof window === 'undefined') return; setConcertInfoCollapsed(!concertInfoCollapsed); moveSecondCardOnToggle(!concertInfoCollapsed); if (leftCardContentRef.current && leftCardRef.current && rightCardRef.current) { if (concertInfoCollapsed) { /* Opening logic */ } else { /* Closing logic */ } } };
  const toggleEventDetails = () => { if (typeof window === 'undefined') return; setEventDetailsCollapsed(!eventDetailsCollapsed); if (rightCardContentRef.current) { if (eventDetailsCollapsed) { /* Opening logic */ } else { /* Closing logic */ } } };
  const moveSecondCardOnToggle = (isCollapsed: boolean) => { if (typeof window === 'undefined') return; const firstCard = document.querySelector('.left-card-container'); const secondCard = document.querySelector('.right-card-container'); if (firstCard && secondCard) { const firstCardRect = firstCard.getBoundingClientRect(); const firstCardHeight = firstCardRect.height; const newTopPosition = isCollapsed ? '64%' : `calc(64% + ${firstCardHeight / 2}px)`; (secondCard as HTMLElement).style.top = newTopPosition; } };
  useEffect(() => { // localStorage scroll check
    if (typeof window === 'undefined') return;

    // DISABLED localStorage auto-scroll
    // const shouldScrollToTickets = localStorage.getItem('scrollToTickets') === 'true'; 
    // if (shouldScrollToTickets) { 
    //   localStorage.removeItem('scrollToTickets'); 
    //   console.log("Found scrollToTickets flag in localStorage, clearing it"); 
    //   setTimeout(() => { 
    //     scrollToTickets(); 
    //   }, 500); 
    // }
  }, []);
  useEffect(() => { // hash scroll check on load
    if (typeof window === 'undefined') return;
    // DISABLED automatic scrolling on load
    // if (window.location.hash) { 
    //   console.log("PAGE LOADED WITH HASH:", window.location.hash); 
    //   if (window.location.hash === '#reserve-tickets' || window.location.hash.includes('ticket') || window.location.hash.includes('reserve')) { 
    //     setTimeout(() => { 
    //       document.body.classList.add('smooth-scrolling'); 
    //       throttledScrollToTickets(); 
    //       setTimeout(() => { 
    //         document.body.classList.remove('smooth-scrolling'); 
    //       }, 1000); 
    //     }, 500); 
    //   }
    // }
  }, []);
  useEffect(() => { // Link Click Interception (Unchanged)
    if (typeof window === 'undefined') return; const handleLinkClick = (e: MouseEvent) => { const target = e.target as HTMLElement; let currentElement: HTMLElement | null = target; while (currentElement) { if (currentElement.tagName === 'A') { const href = currentElement.getAttribute('href'); console.log("LINK CLICKED:", href); if (href && (href.startsWith('#') || href.includes('ticket') || href.includes('reserve') || href.includes('boleto'))) { console.log("INTERCEPTING LINK CLICK:", href); e.preventDefault(); e.stopPropagation(); document.body.classList.add('smooth-scrolling'); if (href === '#reserve-tickets' || href.includes('ticket') || href.includes('reserve')) { throttledScrollToTickets(e as unknown as React.MouseEvent); } else { const targetId = href.startsWith('#') ? href.substring(1) : href; history.pushState(null, '', `#${targetId}`); const targetElement = document.getElementById(targetId); if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); } } setTimeout(() => { document.body.classList.remove('smooth-scrolling'); }, 1000); return; } } currentElement = currentElement.parentElement; } }; document.addEventListener('click', handleLinkClick, true); return () => { document.removeEventListener('click', handleLinkClick, true); };
  }, []);

  // --- *** useEffect with the PROBLEMATIC Non-Link Click Handler - NOW FIXED *** ---
  useEffect(() => {
    if (typeof window === 'undefined') return; // Client-side only

    const handleNonLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // **** FIXED: Check if target is an Element that supports closest() method ****
      if (target && 'closest' in target && target.closest('#reserve-tickets')) {
        // If the click originated within the hero section form area,
        // THIS listener should ignore it completely and let hero-section handle it.
        console.log("MarketingSection non-link listener: Click inside #reserve-tickets - IGNORING.");
        return; // <<<< EXIT EARLY, DO NOT STOP PROPAGATION or preventDefault
      }
      // **** END OF FIX ****

      // ----- Logic below ONLY runs for clicks OUTSIDE the form area -----

      // Skip links (handled by handleAnchorClick/handleLinkClick) and form inputs
      if (target.tagName === 'A' ||
        ('closest' in target && target.closest('a')) ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        ('closest' in target && target.closest('input')) ||
        ('closest' in target && target.closest('textarea'))) {
        return;
      }

      // Check buttons/divs/spans *outside* the form for ticket-related text/classes
      let currentElement: HTMLElement | null = target;
      while (currentElement) {
        // Only check relevant tags
        if (currentElement.tagName === 'BUTTON' || currentElement.tagName === 'SPAN' || currentElement.tagName === 'DIV') {
          const elementText = currentElement.textContent?.toLowerCase() || '';
          const classList = Array.from(currentElement.classList);
          const ticketClass = classList.find(cn => cn.includes('ticket') || cn.includes('reserve') || cn.includes('boleto'));

          // If it looks like a scroll trigger *and is outside the form*
          if (ticketClass || elementText.includes('ticket') || elementText.includes('boleto') || elementText.includes('reserve')) {
            // Check it's not one of the specific buttons handled by their own onClick if necessary
            if (scrollButtonsRef.current.includes(currentElement as HTMLButtonElement)) return; // Let specific onClick handle
            if (ticketButtonRef.current?.contains(currentElement)) return; // Let link handler handle

            console.log("MarketingSection non-link listener: Potential scroll trigger clicked outside form:", elementText || ticketClass);
            // Stop propagation ONLY for these specific external triggers
            e.preventDefault();
            e.stopPropagation(); // Stop click here for THESE elements
            throttledScrollToTickets(e as unknown as React.MouseEvent);
            return; // Handled
          }
        }
        // Stop traversing up if we hit the body or html
        if (!currentElement.parentElement || currentElement.id === 'reserve-tickets') break;
        currentElement = currentElement.parentElement;
      }
    };

    // Attach the listener
    document.addEventListener('click', handleNonLinkClick, true); // Still use capture phase
    // Cleanup
    return () => { document.removeEventListener('click', handleNonLinkClick, true); };
  }, []); // Empty dependency array

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("Form submission started")

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setSubmitStatus("error")
      setErrorMessage("Please fill in all required fields.")
      console.log("Form validation failed: missing required fields")
      return
    }

    // Reset states
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Force reset any scrolling flags that might be set in other components
    // This ensures the form submission isn't blocked by scrolling logic
    if (window && window.document) {
      const scrollingElements = window.document.querySelectorAll('[data-scrolling="true"]')
      scrollingElements.forEach(el => {
        el.setAttribute('data-scrolling', 'false')
      })
      console.log("🔄 Reset any scrolling flags to ensure form submission works")
    }

    try {
      // UPDATED GOOGLE APPS SCRIPT URL - DO NOT CHANGE
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxR9fw8zObPBC5f0hVISzlkzqQlpsB7UwRDUX2L0zB-4ip45537c79Fo9MFb3rRUhAzpw/exec"

      console.log("⭐ FORM SUBMISSION ATTEMPT - DATA:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || "",
        message: formData.message || ""
      })

      console.log("⭐ Using FINAL SIMPLIFIED Google Script URL:", scriptUrl)

      // SUPER SIMPLE APPROACH: Just render an actual form and submit it
      // This is the most compatible approach that works across all browsers

      // First set UI to submitting state to give feedback
      setIsSubmitting(true)

      // Short delay to ensure the UI updates before we proceed
      setTimeout(() => {
        console.log("📝 Creating temporary form in the DOM")

        // Create a visible form - this is crucial for maximum compatibility
        const tempFormContainer = document.createElement('div')
        tempFormContainer.style.position = 'fixed'
        tempFormContainer.style.top = '0'
        tempFormContainer.style.left = '0'
        tempFormContainer.style.width = '100%'
        tempFormContainer.style.height = '100%'
        tempFormContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        tempFormContainer.style.zIndex = '9999'
        tempFormContainer.style.display = 'flex'
        tempFormContainer.style.alignItems = 'center'
        tempFormContainer.style.justifyContent = 'center'

        // Add a message
        const messageDiv = document.createElement('div')
        messageDiv.style.backgroundColor = 'white'
        messageDiv.style.color = 'black'
        messageDiv.style.padding = '20px'
        messageDiv.style.borderRadius = '10px'
        messageDiv.style.maxWidth = '400px'
        messageDiv.style.textAlign = 'center'
        messageDiv.innerHTML = `
          <h3 style="margin-bottom: 10px; font-weight: bold; font-size: 18px;">Submitting Your Reservation</h3>
          <p style="margin-bottom: 15px;">Please wait while we process your information...</p>
          <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #ccc; border-top-color: #333; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <style>
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
        `
        tempFormContainer.appendChild(messageDiv)

        // Create the form element - UPDATED: Use iframe to prevent tab opening
        const hiddenIframe = document.createElement('iframe')
        hiddenIframe.name = 'hidden-form-target'
        hiddenIframe.style.display = 'none'
        tempFormContainer.appendChild(hiddenIframe)

        const form = document.createElement('form')
        form.method = 'GET'
        form.action = scriptUrl
        form.target = 'hidden-form-target' // Target the hidden iframe instead of _blank
        form.id = 'direct-submission-form'
        form.setAttribute('data-form-type', 'submission')
        form.style.display = 'none'

        // Add form fields
        const fields = [
          { name: 'firstName', value: formData.firstName },
          { name: 'lastName', value: formData.lastName },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone || '' },
          { name: 'message', value: formData.message || '' }
        ]

        fields.forEach(field => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = field.name
          input.value = field.value
          form.appendChild(input)
        })

        // Add the form to the container
        tempFormContainer.appendChild(form)

        // Add the container to the body
        document.body.appendChild(tempFormContainer)

        console.log("🚀 Submitting form with hidden iframe approach")

        // Submit the form - with extra logging and error handling
        console.log("🚀 FORM SUBMISSION INITIATED")
        try {
          form.submit()
          console.log("✅ Form.submit() called successfully")
        } catch (submitError) {
          console.error("❌ Error during form.submit():", submitError)

          // Fallback to fetch API if form submission fails
          try {
            const queryParams = fields.map(f => `${encodeURIComponent(f.name)}=${encodeURIComponent(f.value)}`).join('&')
            const fullUrl = `${scriptUrl}?${queryParams}`
            console.log("⚠️ Falling back to fetch API:", fullUrl)

            fetch(fullUrl, { method: 'GET', mode: 'no-cors' })
              .then(() => console.log("✅ Fetch fallback successful"))
              .catch(fetchError => console.error("❌ Fetch fallback failed:", fetchError))
          } catch (fetchError) {
            console.error("❌ Fetch API fallback failed:", fetchError)
          }
        }

        // Set a timeout to remove the container after submission
        setTimeout(() => {
          console.log("✅ Removing temporary form container")
          document.body.removeChild(tempFormContainer)

          // Update UI to success state
          console.log("⭐ Setting submission status to success")
          setSubmitStatus("success")

          // Clear the form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: ""
          })

          // Release the submitting state
          setIsSubmitting(false)

          console.log("%c ✅ FORM SUBMITTED SUCCESSFULLY ✅ ", "background: green; color: white; font-size: 16px; padding: 5px;")
        }, 4000) // Give it 4 seconds to complete the submission
      }, 500) // Small delay to ensure the UI updates

    } catch (error) {
      console.error("❌ ERROR SUBMITTING FORM:", error)
      setSubmitStatus("error")
      setErrorMessage("There was a problem submitting your reservation. Please try again or contact us directly.")
      setIsSubmitting(false)
    }
  }

  // Add a function to manually trigger the success state for testing
  const testSuccessMessage = () => {
    setSubmitStatus("success")
    console.log("Testing success message display")
  }

  // UPDATED: Alternative submission method as a last resort
  const submitWithFormElement = () => {
    console.log("Using DIRECT FORM SUBMISSION method with hidden iframe")

    // First, show a loading overlay
    const loadingOverlay = document.createElement('div')
    loadingOverlay.style.position = 'fixed'
    loadingOverlay.style.top = '0'
    loadingOverlay.style.left = '0'
    loadingOverlay.style.width = '100%'
    loadingOverlay.style.height = '100%'
    loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    loadingOverlay.style.zIndex = '9999'
    loadingOverlay.style.display = 'flex'
    loadingOverlay.style.alignItems = 'center'
    loadingOverlay.style.justifyContent = 'center'

    const loadingMessage = document.createElement('div')
    loadingMessage.style.backgroundColor = 'white'
    loadingMessage.style.padding = '20px'
    loadingMessage.style.borderRadius = '10px'
    loadingMessage.style.textAlign = 'center'
    loadingMessage.innerHTML = `
      <h3 style="margin-bottom: 10px; font-weight: bold;">Processing Your Reservation</h3>
      <p>Please wait while we submit your information...</p>
      <div style="margin-top: 15px; display: inline-block; width: 30px; height: 30px; border: 3px solid #ccc; border-top-color: #333; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `

    loadingOverlay.appendChild(loadingMessage)
    document.body.appendChild(loadingOverlay)

    // Set UI state
    setIsSubmitting(true)

    // Create hidden iframe for the form target
    const hiddenIframe = document.createElement('iframe')
    hiddenIframe.name = 'hidden-alt-form-target'
    hiddenIframe.style.display = 'none'
    document.body.appendChild(hiddenIframe)

    // Create form element
    const form = document.createElement('form')
    form.method = 'GET'
    form.action = "https://script.google.com/macros/s/AKfycbxR9fw8zObPBC5f0hVISzlkzqQlpsB7UwRDUX2L0zB-4ip45537c79Fo9MFb3rRUhAzpw/exec"
    form.id = 'alternative-submission-form'
    form.setAttribute('data-form-type', 'alternative-submission')
    form.target = 'hidden-alt-form-target' // Target the hidden iframe

    // Add inputs
    const fields = [
      { name: 'firstName', value: formData.firstName },
      { name: 'lastName', value: formData.lastName },
      { name: 'email', value: formData.email },
      { name: 'phone', value: formData.phone || '' },
      { name: 'message', value: formData.message || '' }
    ]

    fields.forEach(field => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = field.name
      input.value = field.value
      form.appendChild(input)
    })

    // Add to body
    document.body.appendChild(form)

    console.log("🚀 Submitting alternative form using hidden iframe")

    // Try to submit the form
    try {
      form.submit()
      console.log("✅ Alternative form.submit() called successfully")

      // Set a timeout to remove the loading overlay and update UI
      setTimeout(() => {
        document.body.removeChild(loadingOverlay)
        if (document.body.contains(form)) {
          document.body.removeChild(form)
        }
        if (document.body.contains(hiddenIframe)) {
          document.body.removeChild(hiddenIframe)
        }

        // Update UI
        setIsSubmitting(false)
        setSubmitStatus("success")

        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        })

        console.log("✅ ALTERNATIVE FORM SUBMITTED SUCCESSFULLY")
      }, 3000)

    } catch (submitError) {
      console.error("❌ Error during alternative form.submit():", submitError)

      // Fallback to fetch API
      try {
        const queryParams = fields.map(f => `${encodeURIComponent(f.name)}=${encodeURIComponent(f.value)}`).join('&')
        const fullUrl = `${form.action}?${queryParams}`
        console.log("⚠️ Falling back to fetch API:", fullUrl)

        fetch(fullUrl, { method: 'GET', mode: 'no-cors' })
          .then(() => {
            console.log("✅ Fetch fallback successful")

            // Clean up and show success
            document.body.removeChild(loadingOverlay)
            if (document.body.contains(form)) document.body.removeChild(form)
            if (document.body.contains(hiddenIframe)) document.body.removeChild(hiddenIframe)

            setIsSubmitting(false)
            setSubmitStatus("success")

            // Clear form
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              message: ""
            })
          })
          .catch(fetchError => {
            console.error("❌ Fetch fallback failed:", fetchError)
            document.body.removeChild(loadingOverlay)
            setIsSubmitting(false)
            setSubmitStatus("error")
            setErrorMessage("Unable to submit form. Please try again later or contact us directly.")
          })
      } catch (fetchError) {
        console.error("❌ All submission methods failed:", fetchError)
        document.body.removeChild(loadingOverlay)
        setIsSubmitting(false)
        setSubmitStatus("error")
        setErrorMessage("Unable to submit form. Please try again later or contact us directly.")
      }
    }
  }

  // --- JSX (Unchanged - Design Preserved) ---
  return (
    <div id="reserve-tickets" className="relative w-full bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 overflow-y-auto flex flex-col min-h-screen">
      {/* Title for the Hero Section */}
      <div className="sticky top-0 pt-4 sm:pt-12 md:pt-16 pb-2 sm:pb-10 md:pb-12 z-50 bg-gradient-to-b from-purple-900/80 to-transparent">
        <div className="container mx-auto text-center px-4">
          <div className="inline-block relative mb-1 sm:mb-2">
            <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl absolute -left-4 sm:-left-6 md:-left-8 top-1/2 transform -translate-y-1/2">•</span>
            <h2 className="relative text-xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase">
              <span className="text-red-500 relative mr-1">
                F.<span className="absolute -inset-1 bg-red-500 blur-sm opacity-30 -z-10"></span>
              </span>
              <span className="text-white">HERRERA</span>
            </h2>
            <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl absolute -right-4 sm:-right-6 md:-right-8 top-1/2 transform -translate-y-1/2">•</span>
          </div>
          <div className="h-1 bg-red-500 w-16 sm:w-24 md:w-48 mx-auto mt-1 sm:mt-3 md:mt-4 mb-1 sm:mb-2"></div>

          {/* Section title */}
          <h3 className="text-white text-lg md:text-2xl uppercase tracking-wide font-semibold drop-shadow-md mb-3">
            {t("section.title")}
          </h3>

          {/* Subtitle with 3D styling */}
          <div className="relative mb-3 sm:mb-4 md:mb-5 mx-auto flex justify-center">
            <div className="bg-black/40 border-l-2 border-r-2 border-red-500 px-4 sm:px-6 md:px-8 py-2 rounded-md inline-block text-center shadow-lg relative">
              <div className="absolute inset-0 bg-red-500/5 rounded-md"></div>
              <p className="text-white text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider leading-tight relative">
                <span className="text-red-500 mr-2 drop-shadow-md">•</span>
                <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{t("section.subtitle")}</span>
                <span className="text-red-500 ml-2 drop-shadow-md">•</span>
              </p>
              <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium uppercase tracking-wide mt-1 relative drop-shadow-sm">
                {t("section.description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - MOBILE-FIRST DESIGN */}
      <div className="flex-grow container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Card with simple styling that works reliably on mobile */}
        <div className="bg-black/80 rounded-lg border border-white/10 shadow-lg mx-auto max-w-[95%] sm:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] overflow-visible">
          {/* Success message */}
          {submitStatus === "success" && (
            <div className="bg-green-500/20 border border-green-500/30 text-green-200 p-2 sm:p-4 rounded-md text-center text-sm sm:text-base md:text-lg m-3 sm:m-6">
              <p className="font-bold">{t("form.successMessage")}</p>
            </div>
          )}

          {/* Responsive grid for image and form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 sm:p-6 md:p-8">
            {/* Image Section */}
            <div className="bg-black/70 p-3 sm:p-5 border border-white/20 rounded-lg">
              <div className="aspect-[16/16] relative overflow-hidden rounded">
                <Image
                  src="/images/francisco-concert-poster.png"
                  alt="Francisco Herrera in Concert"
                  fill
                  className="object-cover object-[center_50%]"
                  priority
                />
              </div>
            </div>

            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-2 rounded-md text-center text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Form notice */}
                <div className="bg-blue-500/20 border border-blue-500/30 text-blue-200 p-2 rounded-md text-xs text-center">
                  <p>{t("form.notice")}</p>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">{t("form.firstName")} *</p>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t("form.firstNamePlaceholder")}
                      required
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">{t("form.lastName")} *</p>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t("form.lastNamePlaceholder")}
                      required
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">{t("form.email")} *</p>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("form.emailPlaceholder")}
                      required
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">{t("form.phone")}</p>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("form.phonePlaceholder")}
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <p className="text-xs uppercase text-gray-400">{t("form.message")}</p>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("form.messagePlaceholder")}
                    className="bg-white/10 border border-white/30 rounded-md text-white min-h-[60px] resize-none text-sm"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`w-3/4 max-w-xs flex items-center justify-center py-3 px-4 text-white font-bold bg-gradient-to-r from-red-600 to-red-500 rounded-md relative overflow-hidden group transition-all duration-300 ease-in-out pulse-animation ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-red-500 hover:to-red-600 hover:shadow-lg"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("form.processingMessage")}
                      </div>
                    ) : (
                      <>{t("reserve.button")}</>
                    )}
                  </button>
                </div>

                {/* Alternative submission method */}
                <div className="text-center mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!formData.firstName || !formData.lastName || !formData.email) {
                        setSubmitStatus("error")
                        setErrorMessage(t("form.submitError"))
                        return
                      }
                      submitWithFormElement()
                    }}
                    className="text-blue-300 hover:text-blue-400 text-xs underline"
                  >
                    {t("form.alternativeMethod")}
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  {t("form.requiredFields")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Text - Desktop only */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none sm:flex">
        <h1 className="text-[8rem] md:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-marquee">
          CONCERT • FRANCISCO • CONCERT • FRANCISCO •
        </h1>
      </div>

      {/* Styles - SIMPLIFIED FOR MOBILE WITHOUT WHITESPACE */}
      <style jsx global>{`
        /* Simplified styles that work reliably on mobile */
        html, body {
          overflow-x: hidden;
          position: relative;
          min-height: 100%;
          background-color: black; /* Prevent white background showing */
          margin: 0;
          padding: 0;
        }
        
        /* Prevent zoom on iOS */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          select, textarea, input {
            font-size: 16px !important;
          }
        }
        
        /* Prevent overscroll behavior */
        html, body {
          overscroll-behavior-y: none;
        }
        
        /* Fix any possible leaks causing whitespace */
        #__next, main {
          background-color: black;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animation for success message */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        /* Background text animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        /* Mobile optimization */
        @media (max-width: 640px) {
          #reserve-tickets {
            min-height: 100vh !important;
          }
          
          /* Ensure input fields are tall enough for touch */
          input, textarea, button {
            min-height: 42px !important;
          }
        }
      `}</style>
    </div>
  )
}