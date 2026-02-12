// languages.js - Manages multilingual content for the portfolio website

// Define the translation object containing all translatable strings for English and Arabic.
const translations = {
    'ar': {
        // Meta Tags for SEO and page title
        'meta_description': 'محفظة حامد سيد أحمد أبو سلام، مصمم ويب متخصص في إنشاء مواقع سهلة الاستخدام وجذابة بصريًا.',
        'meta_keywords': 'محفظة، مصمم ويب، تطوير ويب، تصميم جرافيك، حامد سيد أحمد أبو سلام',
        'page_title': 'محفظتي',

        // Navigation links text and titles
        'nav_home_title': 'الرئيسية',
        'nav_home': 'الرئيسية',
        'nav_about_title': 'عني',
        'nav_about': 'عني',
        'nav_certificates_title': 'شهاداتي',
        'nav_certificates': 'شهاداتي',
        'nav_services_title': 'خدماتي',
        'nav_services': 'خدماتي',
        'nav_portfolio_title': 'أعمالي',
        'nav_portfolio': 'أعمالي',
        'nav_contact_title': 'تواصل معي',
        'nav_contact': 'تواصل معي',

        // Home Section content
        'home_greeting': 'مرحبًا، اسمي <span class="name">حامد سيد أحمد</span>',
        'home_profession': 'أنا <span class="typing">مصمم ويب</span>', // Target for Typed.js
        'home_description': 'خريج علوم الحاسب أعمل في تطوير مهاراتي في تصميم الويب والجرافيك. أهتم بإنشاء مواقع بسيطة وفعالة، وأتعلم تحسين تجربة المستخدم والتصميم. أسعى للتطور المستمر وتطبيق ما أتعلمه في مشاريع حقيقية.',
        'home_download_cv': 'تحميل السيرة الذاتية',
        'home_typing_strings': ["مصمم ويب", "مصمم جرافيك", "متعدد المهارات", "مبدع رقمي", "منشئ محتوى", "تقني دعم"], // Strings for Typed.js

        // About Section content
        'about_title': 'عني',
        'about_intro': 'أنا حامد أبو سلام، <span class="text-highlight">خريج علوم الحاسب</span> أتطور مهاراتي',
        'about_profession_highlight': 'خريج علوم الحاسب ومتعدد المهارات',
        'about_description': 'خريج علوم الحاسب أهتم بتعلم تصميم وتطوير الويب. لدي خبرة متوسطة في العمل مع برامج التصميم (Photoshop, Illustrator) وإنشاء محتوى بسيط. أيضاً لدي خلفية في دعم تقني. أركز على التعلم المستمر وتحسين مهاراتي من خلال المشاريع العملية.',
        
        // Personal Info items
        'info_birthdate_label': 'تاريخ الميلاد',
        'info_address_label': 'العنوان',
        'info_address_value': 'مصر - المنوفية',
        'info_nationality_label': 'الجنسية',
        'info_nationality_value': 'مصري',
        'info_email_label': 'البريد الإلكتروني',
        'info_phone_label': 'الهاتف',
        'info_degree_label': 'المؤهل',
        'info_degree_value': 'بكالوريوس علوم حاسب',
        'info_freelance_label': 'العمل الحر',
        'info_freelance_value': 'متاح',
        'info_languages_label': 'اللغات',
        'info_languages_value': 'العربية (لغة أم)، الإنجليزية (جيدة)',
        'about_hire_me': 'وظفني',

        // Skills section titles
        'skill_html': 'HTML',
        'skill_css': 'CSS',
        'skill_js': 'JS',
        'skill_react': 'React',
        'skill_photoshop': 'Photoshop',
        'skill_premiere': 'Premiere',
        'skill_after effects': 'After Effects',
        // Education section content
        'education_title': 'التعليم',
        'edu_date_1': '2023',
        'edu_title_1': 'بكالوريوس علوم الحاسب',
        'edu_univ_1': 'جامعة المنوفية - كلية الحاسب والمعلومات',
        'edu_desc_1': 'جامعة المنوفية - كلية الحاسب والمعلومات. خريج قسم علوم الحاسب حيث اكتسبت أسسًا قوية في البرمجة وهندسة البرمجيات وتطوير الويب والقواعد البيانات، مع التركيز على حل المشاكل والتفكير التحليلي الصحيح.',
        
        // Technical Certifications
        'tech_certs_title': 'الشهادات التقنية',
        'cert_tech_date_1': '2026',
        'cert_tech_title_1': 'IT Customer Support Basics (CISCO)',
        'cert_tech_desc_1': 'شهادة أساسيات دعم تقنية العملاء من سيسكو.',
        'cert_tech_date_2': '',
        'cert_tech_title_2': 'EF SET Certificate - B1 Intermediate',
        'cert_tech_desc_2': 'شهادة اللغة الإنجليزية من EF SET بمستوى B1 متوسط.',
        'cert_tech_date_3': '',
        'cert_tech_title_3': 'Generative AI and Prompt Engineering',
        'cert_tech_desc_3': 'شهادة في الذكاء الاصطناعي التوليدي والهندسة المتقدمة من مؤسسة دبي المستقبل.',
        'cert_tech_date_4': '2026',
        'cert_tech_title_4': 'IT Fundamentals (Cursa)',
        'cert_tech_desc_4': 'شهادة أساسيات تقنية المعلومات من منصة Cursa.',
        'cert_tech_date_5': '2025',
        'cert_tech_title_5': 'Developing Digital Content (Edraak)',
        'cert_tech_desc_5': 'شهادة تطوير المحتوى الرقمي من منصة Edraak.',
        'cert_tech_date_6': '12/12/25',
        'cert_tech_title_6': 'UX Design Fundamentals (MaharaTech)',
        'cert_tech_desc_6': 'شهادة أساسيات تصميم تجربة المستخدم من MaharaTech.',
        'cert_tech_date_7': '2025',
        'cert_tech_title_7': 'Google Digital Garage',
        'cert_tech_desc_7': 'شهادة أساسيات التسويق الرقمي من Google Digital Garage.',
        'cert_tech_date_8': '2018 - 2019',
        'cert_tech_title_8': 'Advertising & Marketing Diploma',
        'cert_tech_desc_8': 'دبلوم متخصص في الإعلان والتسويق الرقمي من أكاديمية Career College لمدة 6 أشهر. اكتسبت فيه معرفة عملية بأساليب التسويق الحديثة واستراتيجيات الإعلان.',

        // Experience section content
        'experience_title': 'الخبرة العملية',
        'exp_date_1': '2024 - الآن',
        'exp_title_1': 'Digiton Life Mix - مؤسس ومنشئ محتوى (عمل حر)',
        'exp_desc_1': 'أنشئ محتوى تعليمي وتقني على يوتيوب وإنستجرام. أركز على مساعدة المبتدئين في مجالات الويب والتقنية من خلال شروحات بسيطة وعملية.',
        'exp_date_2': '2022 - 2023',
        'exp_title_2': 'Plaza Cars Rental (UAE) - مساعد تصميم ويب وعام',
        'exp_desc_2': 'ساعدت في تصميم والمساهمة في موقع الشركة. تعاملت مع العملاء وتعلمت أساسيات إدارة الوسائط الاجتماعية والتسويق البسيط.',
        'exp_date_3': '2020 - 2021',
        'exp_title_3': 'Ascom Computer Company - ضابط تقني',
        'exp_desc_3': 'قمت بصيانة أجهزة وبرامج الكمبيوتر. قدمت الدعم للعملاء في استكشاف الأخطاء وحل المشاكل التقنية.',
        'exp_date_4': '2019 - 2020',
        'exp_title_4': 'Al Safwa - مركز المساعدة',
        'exp_desc_4': 'قدمت الدعم البرمجي والأجهزة للأنظمة الداخلية بالشركة.',
        
        // Services section content
        'services_title': 'خدماتي',
        'service_web_design_title': 'تصميم الويب',
        'service_web_design_desc': 'أساعد في إنشاء مواقع ويب بسيطة وسهلة الاستخدام. أركز على تصميم واضح وملاءم لجميع الأجهزة، مع الاهتمام بتجربة المستخدم الأساسية.',
        'service_ui_ux_title': 'تصميم واجهة وتجربة المستخدم (UI/UX)',
        'service_ui_ux_desc': 'أعمل على إنشاء واجهات سهلة وواضحة. أركز على جعل الموقع سهل الاستخدام والتنقل فيه، مع اهتمام بسيط بالجانب البصري.',
        'service_graphic_design_title': 'تصميم الجرافيك',
        'service_graphic_design_desc': 'أساعد في إنشاء تصاميم بسيطة جذابة للمواقع والوسائط الاجتماعية. أستخدم أدوات مثل Photoshop و Illustrator لإنشاء تصاميم أساسية وفعالة.',
        'service_seo_title': 'تحسين محركات البحث (SEO)',
        'service_seo_desc': 'أتعلم تحسين أساسيات SEO للمواقع. أركز على الممارسات الأساسية مثل الكلمات المفتاحية والعناوين، وأساعد في تحسين الحضور العضوي للموقع.',
        'service_tech_support_title': 'الدعم التقني',
        'service_tech_support_desc': 'أساعد في حل المشاكل التقنية الأساسية للبرامج والأجهزة. أقدم دعماً بسيطاً وعملياً للمستخدمين والشركات الصغيرة لحل مشاكلهم التقنية.',
        'service_help_desk_title': 'مركز المساعدة',
        'service_help_desk_desc': 'أوفر خدمات مركز مساعدة أساسية للعملاء. أقوم بالرد على الاستفسارات التقنية وحل المشاكل البسيطة بسرعة واحترافية والعمل على رضا العميل.',
        'service_view_cert': 'عرض الشهادات المتعلقة',

        // Certificates section content
        'certificates_title': 'شهاداتي',
        'cert_adobe_track': 'مسار تصميم Adobe',
        'cert_it_track': 'مسار تكنولوجيا المعلومات والكمبيوتر',
        'cert_web_track': 'مسار تطوير الويب',
        'cert_marketing_track': 'مسار التسويق الرقمي',
        'cert_other_track': 'شهادات أخرى',

        // Portfolio section content
        'portfolio_title': 'أعمالي',
        'portfolio_projects_heading': 'المشاريع :',

        // Contact section content and form placeholders
        'contact_title': 'تواصل معي',
        'contact_ready_to_collaborate': 'جاهز للتعاون؟',
        'contact_inquiry_message': 'يسعدني الإجابة على استفساراتك أو مناقشة مشروعك القادم.',
        'contact_call_on': 'اتصل بي على',
        'contact_email_at': 'راسلني عبر البريد الإلكتروني',
        'contact_website': 'الموقع الإلكتروني',
        'contact_office': 'المكتب',
        'contact_office_value': 'عبر الإنترنت',
        'form_name_placeholder': 'اسمك',
        'form_email_placeholder': 'بريدك الإلكتروني',
        'form_subject_placeholder': 'الموضوع',
        'form_message_placeholder': 'رسالتك',
        'form_send_message_button': 'إرسال الرسالة',
        'theme_colors_title': 'ألوان الثيم'
    },
    'en': {
        // English translations
        'meta_description': 'Portfolio of Hamed Sayed Ahmed Abu Sallam, a web designer specializing in user-friendly and visually appealing websites.',
        'meta_keywords': 'portfolio, web designer, web development, graphic design, Hamed Sayed Ahmed Abu Sallam',
        'page_title': 'My Portfolio',

        'nav_home_title': 'Home',
        'nav_home': 'Home',
        'nav_about_title': 'About',
        'nav_about': 'About',
        'nav_certificates_title': 'Certificates',
        'nav_certificates': 'Certificates',
        'nav_services_title': 'Services',
        'nav_services': 'Services',
        'nav_portfolio_title': 'Portfolio',
        'nav_portfolio': 'Portfolio',
        'nav_contact_title': 'Contact',
        'nav_contact': 'Contact',

        'home_greeting': 'Hello, my name is <span class=\"name\">Hamed Sayed Ahmed</span>',
        'home_profession': 'I\'m a <span class=\"typing\">Web Designer</span>',
        'home_description': 'Computer Science graduate working on improving my skills in web design and graphic design. I focus on creating simple and functional websites. Learning technical support and design tools. Always eager to learn and practice new things through real projects.',
        'home_download_cv': 'Download CV',
        'home_typing_strings': ["Web Designer", "Tech Support", "Content Creator", "Multi-talented"],

        'about_title': 'About Me',
        'about_intro': 'I\'m Hamed Abu Sallam, a <span class="text-highlight">Computer Science Graduate</span> developing my skills',
        'about_profession_highlight': 'Computer Science Graduate developing skills',
        'about_description': 'Computer Science graduate with intermediate level skills in web design and graphic design. I work on improving my abilities in creating websites and designs through practical projects and learning. I have some background in technical support as well. I focus on continuous learning and applying what I learn to real projects.',

        'info_birthdate_label': 'Birthdate',
        'info_address_label': 'Address',
        'info_address_value': 'Egypt - Menofia',
        'info_nationality_label': 'Nationality',
        'info_nationality_value': 'Egyptian',
        'info_email_label': 'Email',
        'info_phone_label': 'Phone',
        'info_degree_label': 'Degree',
        'info_degree_value': 'Bachelor of Computer Science',
        'info_freelance_label': 'Freelance',
        'info_freelance_value': 'Available',
        'info_languages_label': 'Languages',
        'info_languages_value': 'Arabic (Native), English (Good)',
        'info_freelance_value': 'Available',
        'info_languages_label': 'Languages',
        'info_languages_value': 'Arabic, English',
        'about_hire_me': 'Hire Me',

        'skill_html': 'HTML',
        'skill_css': 'CSS',
        'skill_js': 'JS',
        'skill_react': 'React',
        'skill_photoshop': 'Photoshop',
        'skill_premiere': 'Premiere',
        'skill_after effects': 'After Effects',

        'education_title': 'Education',
        'edu_date_1': '2023',
        'edu_title_1': 'Bachelor\'s Degree in Computer Science',
        'edu_univ_1': 'Al-Manoufia University - Faculty of Computers and Information',
        'edu_desc_1': 'Al-Manoufia University - Faculty of Computers and Information. Graduated with focus on programming fundamentals, software basics, and web design. Learned about problem solving and logical thinking through computer science courses.',

        // Technical Certifications
        'tech_certs_title': 'Technical Certifications',
        'cert_tech_date_1': '2026',
        'cert_tech_title_1': 'IT Customer Support Basics (CISCO)',
        'cert_tech_desc_1': 'Certificate in IT Customer Support Basics from CISCO.',
        'cert_tech_date_2': '',
        'cert_tech_title_2': 'EF SET Certificate - B1 Intermediate',
        'cert_tech_desc_2': 'EF SET English language certification at B1 intermediate level.',
        'cert_tech_date_3': '',
        'cert_tech_title_3': 'Generative AI and Prompt Engineering',
        'cert_tech_desc_3': 'Certificate in Generative AI and Prompt Engineering from Dubai Future Foundation.',
        'cert_tech_date_4': '2026',
        'cert_tech_title_4': 'IT Fundamentals (Cursa)',
        'cert_tech_desc_4': 'Certificate in IT Fundamentals from Cursa platform.',
        'cert_tech_date_5': '2025',
        'cert_tech_title_5': 'Developing Digital Content (Edraak)',
        'cert_tech_desc_5': 'Certificate in Developing Digital Content from Edraak platform.',
        'cert_tech_date_6': '12/12/25',
        'cert_tech_title_6': 'UX Design Fundamentals (MaharaTech)',
        'cert_tech_desc_6': 'Certificate in UX Design Fundamentals from MaharaTech.',
        'cert_tech_date_7': '2025',
        'cert_tech_title_7': 'Google Digital Garage',
        'cert_tech_desc_7': 'Certificate in Fundamentals of Digital Marketing from Google Digital Garage.',
        'cert_tech_date_8': '2018 - 2019',
        'cert_tech_title_8': 'Advertising & Marketing Diploma',
        'cert_tech_desc_8': 'Diploma in Advertising and Digital Marketing from Career College (6 months). Learned marketing basics and how to promote products and services online.',

        'experience_title': 'Experience',
        'exp_date_1': '2024 - Present',
        'exp_title_1': 'Digiton Life Mix - Founder & Content Creator (Freelance)',
        'exp_desc_1': 'I create educational and technical content on YouTube and Instagram. I focus on helping beginners in web and tech fields through simple and practical tutorials.',
        'exp_date_2': '2022 - 2023',
        'exp_title_2': 'Plaza Cars Rental (UAE) - Web Design & Marketing Support',
        'exp_desc_2': 'I helped with website design and worked on social media management. I learned about basics of digital marketing and how to communicate with customers.',
        'exp_date_3': '2020 - 2021',
        'exp_title_3': 'Ascom Computer Company - Technical Officer',
        'exp_desc_3': 'Handled computer hardware and software maintenance. Supported customers with troubleshooting and IT solutions.',
        'exp_date_4': '2019 - 2020',
        'exp_title_4': 'Al Safwa Medical Supplies - Help Desk',
        'exp_desc_4': 'Provided software and hardware support for internal systems.',

        'services_title': 'My Services',
        'service_web_design_title': 'Web Design',
        'service_web_design_desc': 'I help create simple and functional websites. I focus on making sites easy to use and compatible with all devices, while paying attention to basic design principles.',
        'service_ui_ux_title': 'UI/UX Design',
        'service_ui_ux_desc': 'I work on creating simple and clear user interfaces. I focus on making sites easy to navigate and pleasant to use, with basic attention to visual design.',
        'service_graphic_design_title': 'Graphic Design',
        'service_graphic_design_desc': 'I create simple and appealing graphic designs for websites and social media. I use tools like Photoshop and Illustrator to create basic designs that work effectively.',
        'service_seo_title': 'SEO Optimization',
        'service_seo_desc': 'I learn and apply basic SEO practices for websites. I focus on simple techniques like keywords and titles, and help improve basic search visibility.',
        'service_tech_support_title': 'Technical Support',
        'service_tech_support_desc': 'I help solve basic technical issues with software and hardware. I provide simple and practical support to users and small businesses to resolve their technical problems.',
        'service_help_desk_title': 'Help Desk',
        'service_help_desk_desc': 'I provide basic help desk support for customers. I respond to technical inquiries, solve common issues quickly and professionally, and focus on customer satisfaction.',
        'service_view_cert': 'View Related Certificates',

        // Certificates section content
        'certificates_title': 'My Certificates',
        'cert_adobe_track': 'Adobe Design Track',
        'cert_it_track': 'IT & Computer Track',
        'cert_web_track': 'Web Development Track',
        'cert_marketing_track': 'Digital Marketing Track',
        'cert_other_track': 'Other Certificates',

        'portfolio_title': 'My Portfolio',
        'portfolio_projects_heading': 'Projects :',

        'contact_title': 'Contact Me',
        'contact_ready_to_collaborate': 'Ready to Collaborate?',
        'contact_inquiry_message': 'I\'d be happy to answer your inquiries or discuss your next project.',
        'contact_call_on': 'Call Me On',
        'contact_email_at': 'Email Me At',
        'contact_website': 'Website',
        'contact_office': 'Office',
        'contact_office_value': 'Online',
        'form_name_placeholder': 'Your Name',
        'form_email_placeholder': 'Your Email',
        'form_subject_placeholder': 'Subject',
        'form_message_placeholder': 'Your Message',
        'form_send_message_button': 'Send Message',
        'theme_colors_title': 'Theme Colors'
    }
};

// Make translations object globally accessible.
// This is crucial for script.js to access the language strings.
window.translations = translations;

/**
 * Sets the website's language and updates all translatable content.
 * Dispatches a 'languageChanged' event to notify other scripts.
 * @param {string} lang - The language code ('en' or 'ar').
 */
function setLanguage(lang) {
    // Set HTML lang and dir attributes for correct browser rendering and accessibility
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // Update meta tags for SEO based on selected language
    document.querySelector('meta[data-lang-key="meta_description"]').setAttribute('content', translations[lang]['meta_description']);
    document.querySelector('meta[data-lang-key="meta_keywords"]').setAttribute('content', translations[lang]['meta_keywords']);
    document.querySelector('title').textContent = translations[lang]['page_title'];

    // Iterate over all elements marked for translation and update their content
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            // Special handling for elements where innerHTML is required (e.g., nested spans)
            if (element.tagName === 'SPAN' && element.classList.contains('name')) {
                // Name span is part of 'home_greeting' innerHTML, so no direct update here.
            } else if (element.tagName === 'SPAN' && element.classList.contains('typing')) {
                // Typing span is handled by Typed.js re-initialization, no direct update here.
            } else if (key === 'home_greeting' || key === 'home_profession' || key === 'about_intro') {
                element.innerHTML = translations[lang][key];
            }
            // Handle placeholder attributes for input/textarea elements
            else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', translations[lang][key]);
            }
            // Update title attributes for navigation links
            else if (element.title && (key.startsWith('nav_') && key.endsWith('_title'))) {
                element.title = translations[lang][key];
            }
            // For nested spans that are highlights within a larger string, their content is updated by the parent's innerHTML.
            else if (key === 'about_profession_highlight') {
                // No direct textContent update needed as it's handled by 'about_intro' innerHTML.
            }
            // Default: update text content for all other elements
            else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Explicitly update placeholder texts for contact form (redundant if covered by general loop but ensures clarity)
    if (document.querySelector('[data-lang-key="form_name_placeholder"]')) {
        document.querySelector('[data-lang-key="form_name_placeholder"]').setAttribute('placeholder', translations[lang]['form_name_placeholder']);
    }
    if (document.querySelector('[data-lang-key="form_email_placeholder"]')) {
        document.querySelector('[data-lang-key="form_email_placeholder"]').setAttribute('placeholder', translations[lang]['form_email_placeholder']);
    }
    if (document.querySelector('[data-lang-key="form_subject_placeholder"]')) {
        document.querySelector('[data-lang-key="form_subject_placeholder"]').setAttribute('placeholder', translations[lang]['form_subject_placeholder']);
    }
    if (document.querySelector('[data-lang-key="form_message_placeholder"]')) {
        document.querySelector('[data-lang-key="form_message_placeholder"]').setAttribute('placeholder', translations[lang]['form_message_placeholder']);
    }

    // Update active class for language buttons in the UI
    document.querySelectorAll('.lang-button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');

    // Save selected language preference to localStorage for persistence
    localStorage.setItem('selectedLanguage', lang);

    // Dispatch a custom event to notify other scripts (e.g., script.js for Typed.js)
    // that the language has changed.
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
}

// Initial language setting when the DOM is fully loaded.
// It retrieves the saved language preference or defaults to English.
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if no preference found
    setLanguage(savedLang);
});

// Expose setLanguage function to the global scope.
// This allows other scripts (like style-switcher.js or direct HTML event handlers) to call it.
window.setLanguage = setLanguage;
