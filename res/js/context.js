/////////////////////////////INDIVIDUAL CONTROLS////////////////////////
var breakLineVerti = `<div class="breaklineVerti" style="cursor: default;"></div>`;

var contextSelectAll =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5H1V3H0V5Z" fill="white"/>
            <path d="M0 1H1V0H0V1Z" fill="white"/>
            <path d="M3 0H5V1H3V0Z" fill="white"/>
            <path d="M7 0H9V1H7V0Z" fill="white"/>
            <path d="M11 0H13V1H11V0Z" fill="white"/>
            <path d="M15 0H17V1H15V0Z" fill="white"/>
            <path d="M19 0H20V1L19 1V0Z" fill="white"/>
            <path d="M20 3V5H19V3H20Z" fill="white"/>
            <path d="M20 7V9H19V7H20Z" fill="white"/>
            <path d="M20 11V13H19V11H20Z" fill="white"/>
            <path d="M20 15V17H19V15H20Z" fill="white"/>
            <path d="M20 19V20H19V19H20Z" fill="white"/>
            <path d="M17 20H15V19H17V20Z" fill="white"/>
            <path d="M13 20H11V19H13V20Z" fill="white"/>
            <path d="M9 20H7V19H9V20Z" fill="white"/>
            <path d="M5 20H3V19H5V20Z" fill="white"/>
            <path d="M1 20H0V19H1V20Z" fill="white"/>
            <path d="M0 17V15H1V17H0Z" fill="white"/>
            <path d="M0 13V11H1V13H0Z" fill="white"/>
            <path d="M0 9V7H1V9H0Z" fill="white"/>
            <path d="M7.12803 7.64109C7.01018 7.32095 7.32144 7.0097 7.64158 7.12754L13.9948 9.46616C14.2688 9.56702 14.3459 9.91793 14.1395 10.1244L12.8394 11.4244L14.6073 13.1923L13.193 14.6065L11.4252 12.8386L10.1249 14.139C9.91842 14.3454 9.56751 14.2683 9.46665 13.9943L7.12803 7.64109Z" fill="white"/>
        </svg>     
    </div>
    <h2>Select All</h2>
    <div class="rcShortcut"><h2>Ctrl+A</h2></div>
</div>`;

var contextClone =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2 8.5C11.0895 8.5 11 8.58954 11 8.7V11H8.7C8.58954 11 8.5 11.0895 8.5 11.2V12.8C8.5 12.9105 8.58954 13 8.7 13H11V15.3C11 15.4105 11.0895 15.5 11.2 15.5H12.8C12.9105 15.5 13 15.4105 13 15.3V13H15.3C15.4105 13 15.5 12.9105 15.5 12.8V11.2C15.5 11.0895 15.4105 11 15.3 11H13V8.7C13 8.58954 12.9105 8.5 12.8 8.5H11.2Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.89543 0.895431 0 2 0H17C18.1046 0 19 0.895431 19 2V3C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19H2C0.895432 19 0 18.1046 0 17V2ZM18 2V3H5C3.89543 3 3 3.89543 3 5V18H2C1.44772 18 1 17.5523 1 17V2C1 1.44772 1.44772 1 2 1H17C17.5523 1 18 1.44771 18 2ZM19 4H5C4.44771 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44771 19.5523 4 19 4Z" fill="white"/>
        </svg>
    </div>
    <h2>Clone</h2>
    <div class="rcShortcut"><h2>Ctrl+C</h2></div>
</div>`;

var contextPaste =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 10H10V11H17V10Z" fill="white"/>
            <path d="M17 13V14H7V13H17Z" fill="white"/>
            <path d="M17 16V17H7V16H17Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0.4C5 0.179086 5.17909 0 5.4 0H11.6C11.8209 0 12 0.179086 12 0.4V1.00005H15C16.1046 1.00005 17 1.89548 17 3.00005V5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V18.0001H2C0.895431 18.0001 0 17.1046 0 16.0001V3.00005C0 1.89548 0.895431 1.00005 2 1.00005H5V0.4ZM5 2.6V2.00005H2C1.44772 2.00005 1 2.44777 1 3.00005V16.0001C1 16.5523 1.44772 17.0001 2 17.0001H4V7C4 5.89543 4.89543 5 6 5H16V3.00005C16 2.44777 15.5523 2.00005 15 2.00005H12V2.6C12 2.82091 11.8209 3 11.6 3H5.4C5.17909 3 5 2.82091 5 2.6ZM18 6C18.5523 6 19 6.44772 19 7V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V7C5 6.44772 5.44772 6 6 6H18Z" fill="white"/>
        </svg>
                             
    </div>
    <h2>Paste</h2>
    <div class="rcShortcut"><h2>Ctrl+V</h2></div>
</div>`;

var contextArrangeLayer =
    `<div class="rcOptionExt">
    <div class="rcIcon">
        <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.2481 1.43421C17.4878 1.2972 17.5711 0.991775 17.4341 0.752016C17.2971 0.512257 16.9917 0.428959 16.7519 0.565964L13.2519 2.56596C13.0961 2.65499 13 2.82066 13 3.00009C13 3.17951 13.0961 3.34519 13.2519 3.43421L16.7519 5.43421C16.9917 5.57121 17.2971 5.48791 17.4341 5.24815C17.5711 5.0084 17.4878 4.70297 17.2481 4.56596L15.3828 3.50009H16.5C17.8807 3.50009 19 4.61937 19 6.00009V9.00009C19 9.27623 19.2239 9.50009 19.5 9.50009C19.7761 9.50009 20 9.27623 20 9.00009V6.00009C20 4.06709 18.433 2.50009 16.5 2.50009H15.3828L17.2481 1.43421Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 21.0001H3C3 22.1047 3.89543 23.0001 5 23.0001H16C17.1046 23.0001 18 22.1047 18 21.0001V10.0001C18 8.89552 17.1046 8.00009 16 8.00009V7.00009C16 5.89552 15.1046 5.00009 14 5.00009H2C0.895431 5.00009 0 5.89552 0 7.00009V19.0001C0 20.1047 0.895431 21.0001 2 21.0001ZM2 6.00009H14C14.5523 6.00009 15 6.4478 15 7.00009V8.00009H5C3.89543 8.00009 3 8.89552 3 10.0001V20.0001H2C1.44772 20.0001 1 19.5524 1 19.0001V7.00009C1 6.4478 1.44772 6.00009 2 6.00009ZM16 9.00009H5C4.44772 9.00009 4 9.4478 4 10.0001V21.0001C4 21.5524 4.44772 22.0001 5 22.0001H16C16.5523 22.0001 17 21.5524 17 21.0001V10.0001C17 9.4478 16.5523 9.00009 16 9.00009Z" fill="white"/>
        </svg>                         
    </div>
    <h2>Position layer</h2>
    <div class="rcIcon" style="margin-left: auto; margin-right: 4px; rotate: 270deg;">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>    
    </div>
</div>`;

var contextDelete =
    `<div class="rcOptionRed">
    <div class="rcIcon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3.5C0 3.22386 0.223858 3 0.5 3H19.5C19.7761 3 20 3.22386 20 3.5C20 3.77614 19.7761 4 19.5 4H0.5C0.223857 4 0 3.77614 0 3.5Z" fill="white"/>
            <path d="M7.2 7C7.08954 7 7 7.08954 7 7.2V15.8C7 15.9105 7.08954 16 7.2 16H8.8C8.91046 16 9 15.9105 9 15.8V7.2C9 7.08954 8.91046 7 8.8 7H7.2Z" fill="white"/>
            <path d="M11 7.2C11 7.08954 11.0895 7 11.2 7H12.8C12.9105 7 13 7.08954 13 7.2V15.8C13 15.9105 12.9105 16 12.8 16H11.2C11.0895 16 11 15.9105 11 15.8V7.2Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3V1C6 0.447715 6.44772 0 7 0H13C13.5523 0 14 0.447715 14 1V3H17C17.5523 3 18 3.44772 18 4V18C18 19.1046 17.1046 20 16 20H4C2.89543 20 2 19.1046 2 18V4C2 3.44772 2.44772 3 3 3H6ZM7 1H13V3H7V1ZM3 4V18C3 18.5523 3.44772 19 4 19H16C16.5523 19 17 18.5523 17 18V4H3Z" fill="white"/>
        </svg>
    </div>
    <h2>Delete</h2>
    <div class="rcShortcut"><h2>Ctrl+X</h2></div>
</div>`;

var contextSave =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 20H2C0.895431 20 0 19.1046 0 18V2C0 0.895431 0.89543 0 2 0H8.92963C9.59834 0 10.2228 0.334202 10.5937 0.890599L11.4063 2.1094C11.7772 2.6658 12.4017 3 13.0704 3H18C19.1046 3 20 3.89543 20 5V18C20 19.1046 19.1046 20 18 20ZM18 19H2C1.44772 19 1 18.5523 1 18V9H19V18C19 18.5523 18.5523 19 18 19ZM19 8V5C19 4.44771 18.5523 4 18 4H13.0704C12.0673 4 11.1306 3.4987 10.5742 2.6641L9.76168 1.4453C9.57622 1.1671 9.26399 1 8.92963 1H2C1.44772 1 1 1.44772 1 2V8H19Z" fill="white"/>
        </svg>
    </div>
    <h2>Save</h2>
    <div class="rcShortcut"><h2>Ctrl+S</h2></div>
</div>`;

var contextDownload =
    `<div class="rcOption">
    <div class="rcIcon" style="margin-left:4px;">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 20H16.2574L14.3787 18.1213C13.2071 16.9497 13.2071 15.0503 14.3787 13.8787C14.9645 13.2929 15.7322 13 16.5 13C16.5 12.6969 16.5449 12.4043 16.6285 12.1285L16.2071 11.7071C15.8166 11.3166 15.1834 11.3166 14.7929 11.7071L10.2071 16.2929C9.81658 16.6834 9.18342 16.6834 8.79289 16.2929L7.04716 14.5472C6.72498 14.225 6.22576 14.1613 5.83303 14.3923L1.16529 17.1381C1.10424 17.174 1.04921 17.2139 1 17.2571V2C1 1.44772 1.44772 1 2 1H18C18.5523 1 19 1.44772 19 2V10.0415C19.1626 10.0142 19.3296 10 19.5 10C19.6704 10 19.8374 10.0142 20 10.0415V2C20 0.895431 19.1046 0 18 0H2C0.895431 0 0 0.895431 0 2V18C0 19.1046 0.895431 20 2 20Z" fill="white"/>
            <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" fill="white"/>
            <path d="M20.5 13C20.5 12.4477 20.0523 12 19.5 12C18.9477 12 18.5 12.4477 18.5 13V16.5858L17.2071 15.2929C16.8166 14.9024 16.1834 14.9024 15.7929 15.2929C15.4024 15.6834 15.4024 16.3166 15.7929 16.7071L18.7929 19.7071C19.1834 20.0976 19.8166 20.0976 20.2071 19.7071L23.2071 16.7071C23.5976 16.3166 23.5976 15.6834 23.2071 15.2929C22.8166 14.9024 22.1834 14.9024 21.7929 15.2929L20.5 16.5858V13Z" fill="white"/>
        </svg>
    </div>
    <h2>Download</h2>
    <div class="rcShortcut"><h2>Ctrl+D</h2></div>
</div>`;

var contextLayerTop =
    `<div class="rcOption">
    <div class="rcIcon" style="margin-left:10px;">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4547 0.127969L19.4246 5.45417L19.4301 5.45745C19.7483 5.65221 19.8856 5.99114 19.8856 6.29424C19.8856 6.59735 19.7483 6.93628 19.4301 7.13104L19.4222 7.13587L18.9519 7.39918L18.9489 7.39397L15.8112 9.15056L10.2571 12.5496C10.0894 12.6014 9.91078 12.6015 9.7431 12.5496L4.23818 9.18076L1.05156 7.39412L1.04846 7.39965L0.577832 7.13579L0.570078 7.13104C0.251828 6.93628 0.114601 6.59735 0.114601 6.29424C0.114601 5.99114 0.251828 5.65221 0.570078 5.45745L0.575514 5.45417L9.54529 0.127959C9.82671 -0.0426562 10.1733 -0.042653 10.4547 0.127969Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1599 9.48703L18.1994 8.90508L19.6959 9.56621L19.7205 9.58082C19.9191 9.69879 19.9979 9.90196 20 10.0698C20.002 10.2378 19.9282 10.4417 19.7342 10.5646L19.7256 10.5701L16.7455 12.2832L19.6648 13.4857L19.6835 13.4954C19.8969 13.6063 19.9843 13.8152 19.9904 13.986C19.9965 14.157 19.9245 14.3682 19.725 14.4946L19.7163 14.5001L10.2853 19.9211C10.1093 20.0263 9.89075 20.0263 9.71469 19.9211L0.283667 14.5001L0.275007 14.4946C0.075464 14.3682 0.00348234 14.157 0.00960127 13.986C0.0157158 13.8152 0.103131 13.6063 0.316504 13.4954L0.335231 13.4857L3.25453 12.2832L0.27443 10.5701L0.265779 10.5646C0.0718187 10.4417 -0.00199226 10.2378 4.07661e-05 10.0698C0.00207331 9.90196 0.0809306 9.69878 0.279536 9.58082L0.306707 9.56468L1.82193 8.9179L2.87052 9.50582L1.41488 10.1272L10 15.0624L18.5954 10.1212L17.1599 9.48703ZM4.29836 12.8833L1.43428 14.063L10 18.9866L18.5657 14.063L15.7016 12.8833L10.2854 15.9969C10.1093 16.1021 9.89071 16.1021 9.71463 15.9969L4.29836 12.8833Z" fill="white"/>
        </svg>
    </div>
    <h2>Move to top</h2>
</div>`;

var contextLayerUp =
    `<div class="rcOption">
    <div class="rcIcon" style="margin-left:10px;">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9524 3.83147V7.2465C10.9524 7.77249 10.526 8.19888 10 8.19888C9.47402 8.19888 9.04762 7.77249 9.04762 7.2465V3.83147L7.81629 5.06279C7.44437 5.43472 6.84135 5.43472 6.46942 5.06279C6.0975 4.69087 6.0975 4.08785 6.46942 3.71592L9.32657 0.85878C9.69849 0.486852 10.3015 0.486852 10.6734 0.85878L13.5306 3.71592C13.9025 4.08785 13.9025 4.69087 13.5306 5.06279C13.1587 5.43472 12.5556 5.43472 12.1837 5.06279L10.9524 3.83147Z" fill="white"/>
            <path d="M18.9283 8.27547L15.182 6.05099C15.3724 5.78528 15.5117 5.49427 15.5999 5.19153L19.4246 7.46259L19.4301 7.46587C19.7483 7.66063 19.8856 7.99956 19.8856 8.30267C19.8856 8.60578 19.7483 8.9447 19.4301 9.13946L19.4222 9.14429L18.9519 9.4076L18.9489 9.40239L15.8112 11.159L10 14.7153L4.23818 11.1892L1.05157 9.40254L1.04846 9.40808L0.577832 9.14421L0.570078 9.13946C0.251828 8.9447 0.114601 8.60578 0.114601 8.30267C0.114601 7.99956 0.251828 7.66063 0.570078 7.46587L0.575514 7.46259L4.40009 5.19158C4.48834 5.49432 4.62766 5.78532 4.81805 6.05102L1.07189 8.27547C1.06981 8.28021 1.06698 8.28968 1.06698 8.30267C1.06698 8.31508 1.06956 8.32427 1.07161 8.3292L4.23814 10.1046L10 13.6307L15.8112 10.0744L18.9286 8.32917C18.9306 8.32424 18.9332 8.31506 18.9332 8.30267C18.9332 8.28967 18.9304 8.28021 18.9283 8.27547Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.82193 10.9263L0.306707 11.5731L0.279537 11.5892C0.0809312 11.7072 0.00207331 11.9104 4.07658e-05 12.0783C-0.00199226 12.2462 0.0718194 12.4501 0.265779 12.573L0.27443 12.5785L3.25453 14.2917L0.335231 15.4941L0.316504 15.5038C0.103131 15.6147 0.0157158 15.8236 0.00960127 15.9944C0.00348234 16.1654 0.0754639 16.3766 0.275007 16.5031L0.283667 16.5086L9.71466 21.9295C9.89073 22.0347 10.1093 22.0347 10.2853 21.9295L19.7163 16.5086L19.725 16.5031C19.9245 16.3766 19.9965 16.1654 19.9904 15.9944C19.9843 15.8236 19.8969 15.6147 19.6835 15.5038L19.6648 15.4941L16.7455 14.2917L19.7256 12.5785L19.7342 12.573C19.9282 12.4501 20.002 12.2462 20 12.0783C19.9979 11.9104 19.9191 11.7072 19.7205 11.5892L19.6959 11.5746L18.1994 10.9135L16.2926 11.981L10.458 15.5516C10.1749 15.7248 9.82518 15.7248 9.54212 15.5516L3.75656 12.011L1.82193 10.9263ZM4.29836 14.8917L1.43427 16.0714L10 20.995L18.5657 16.0714L15.7016 14.8917L10.2854 18.0053C10.1093 18.1106 9.8907 18.1106 9.71461 18.0053L4.29836 14.8917Z" fill="white"/>
        </svg>
    </div>
    <h2>Move up</h2>
</div>`;

var contextLayerDown =
    `<div class="rcOption">
    <div class="rcIcon" style="margin-left:10px;">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4524 1.53246C11.4524 1.00647 11.026 0.580078 10.5 0.580078C9.97402 0.580078 9.54762 1.00647 9.54762 1.53246V4.94749L8.31629 3.71617C7.94437 3.34424 7.34135 3.34424 6.96942 3.71617C6.5975 4.0881 6.5975 4.69111 6.96942 5.06304L9.82657 7.92018C10.1985 8.29211 10.8015 8.29211 11.1734 7.92018L14.0306 5.06304C14.4025 4.69111 14.4025 4.0881 14.0306 3.71617C13.6587 3.34424 13.0556 3.34424 12.6837 3.71617L11.4524 4.94749V1.53246Z" fill="white"/>
            <path d="M15.682 6.05123C15.7031 6.02169 15.7237 5.99184 15.7436 5.9617C15.8909 5.7385 16.0037 5.49918 16.0819 5.2513C16.0881 5.23151 16.0941 5.21167 16.0999 5.19178L19.9246 7.46283L19.9301 7.46611C20.2483 7.66087 20.3856 7.9998 20.3856 8.30291C20.3856 8.60602 20.2483 8.94495 19.9301 9.13971L19.9222 9.14453L19.4519 9.40784L19.4489 9.40264L16.3112 11.1592L10.5 14.7155L4.73818 11.1894L1.55157 9.40278L1.54846 9.40832L1.07783 9.14445L1.07008 9.13971C0.751828 8.94495 0.614601 8.60602 0.614601 8.30291C0.614601 7.9998 0.751828 7.66087 1.07008 7.46611L1.07551 7.46284L4.90009 5.19182C4.98834 5.49456 5.12766 5.78557 5.31805 6.05127L1.57189 8.27572C1.56981 8.28045 1.56698 8.28992 1.56698 8.30291C1.56698 8.31532 1.56956 8.32451 1.57161 8.32944L4.73814 10.1048L10.5 13.6309L16.3112 10.0746L19.4286 8.32942C19.4306 8.32449 19.4332 8.3153 19.4332 8.30291C19.4332 8.28992 19.4304 8.28045 19.4283 8.27572L15.682 6.05123Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.32193 10.9266L0.806707 11.5733L0.779537 11.5895C0.580931 11.7074 0.502073 11.9106 0.500041 12.0785C0.498008 12.2464 0.571819 12.4504 0.765779 12.5733L0.77443 12.5788L3.75453 14.2919L0.835231 15.4944L0.816504 15.5041C0.603131 15.615 0.515716 15.8238 0.509601 15.9947C0.503482 16.1656 0.575464 16.3769 0.775007 16.5033L0.783667 16.5088L10.2147 21.9298C10.3907 22.035 10.6093 22.035 10.7853 21.9298L20.2163 16.5088L20.225 16.5033C20.4245 16.3769 20.4965 16.1656 20.4904 15.9947C20.4843 15.8238 20.3969 15.615 20.1835 15.5041L20.1648 15.4944L17.2455 14.2919L20.2256 12.5788L20.2342 12.5733C20.4282 12.4504 20.502 12.2464 20.5 12.0785C20.4979 11.9106 20.4191 11.7074 20.2205 11.5895L20.1959 11.5749L18.6994 10.9137L16.7926 11.9812L10.958 15.5518C10.6749 15.7251 10.3252 15.7251 10.0421 15.5518L4.25656 12.0113L2.32193 10.9266ZM4.79836 14.892L1.93427 16.0717L10.5 20.9953L19.0657 16.0717L16.2016 14.892L10.7854 18.0055C10.6093 18.1108 10.3907 18.1108 10.2146 18.0055L4.79836 14.892Z" fill="white"/>
        </svg>
    </div>
    <h2>Move down</h2>
</div>`;

var contextLayerBottom =
    `<div class="rcOption">
    <div class="rcIcon" style="margin-left:10px;">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2764 0.0745825C10.1042 -0.0248617 9.89555 -0.02486 9.72335 0.0745827L0.357773 5.48309C-0.0386224 5.71201 -0.0386241 6.31006 0.357773 6.53897L2.84286 7.97408L0.366687 9.35051C-0.0342128 9.57335 -0.0419761 10.1735 0.353011 10.4077L9.71775 15.9603C9.89287 16.0641 10.107 16.0641 10.2821 15.9603L19.6468 10.4077C20.0418 10.1735 20.0341 9.57336 19.6332 9.35051L17.157 7.97406L19.642 6.53897C20.0384 6.31006 20.0384 5.71201 19.642 5.48309L10.2764 0.0745825ZM1.43236 9.89438L3.84541 8.55304L9.72335 11.9475C9.89555 12.0469 10.1042 12.0469 10.2764 11.9475L16.1544 8.55302L18.5675 9.89438L9.99992 14.9743L1.43236 9.89438ZM1.42815 6.01103L9.9999 1.06095L18.5716 6.01103L9.9999 10.9611L1.42815 6.01103Z" fill="white"/>
            <path d="M0.249214 13.6038L2.10967 12.5383L9.77101 17.0572C9.91374 17.139 10.0863 17.139 10.229 17.0572L17.8903 12.5383L19.7508 13.6038C20.0831 13.7941 20.0831 14.2951 19.7508 14.4854L10.229 19.9387C10.0863 20.0204 9.91374 20.0204 9.77101 19.9387L0.249214 14.4854C-0.0830713 14.2951 -0.0830713 13.7941 0.249214 13.6038Z" fill="white"/>
        </svg>
    </div>
    <h2>Move to bottom</h2>
</div>`;

var contextEditText =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H20V1H0V0Z" fill="white"/>
            <path d="M0 19H20V20H0V19Z" fill="white"/>
            <path d="M16 3H15V17H16V3Z" fill="white"/>
            <path d="M14 7.31407V4H4V7.31407H4.31199C4.43788 6.41105 4.73892 5.71573 5.21511 5.2281C5.55446 4.87894 6.09907 4.70435 6.84893 4.70435H7.65353L7.65969 13.905C7.65969 14.5191 7.62959 14.8983 7.56938 15.0428C7.48728 15.2475 7.37507 15.392 7.23276 15.4763C7.03571 15.6027 6.77573 15.6659 6.45279 15.6659H6.08333V16H11.9126V15.6659H11.5431C11.2256 15.6659 10.9739 15.6087 10.7878 15.4943C10.6071 15.3739 10.484 15.2354 10.4183 15.0789C10.3581 14.9224 10.328 14.5311 10.328 13.905L10.3218 4.70435H11.1511C11.671 4.70435 12.035 4.75853 12.243 4.8669C12.6152 5.06556 12.908 5.33345 13.1215 5.67058C13.335 6.00169 13.5293 6.54952 13.7044 7.31407H14Z" fill="white"/>
        </svg>
    </div>
    <h2>Edit text</h2>
    <div class="rcShortcut"><h2>Ctrl+E</h2></div>
</div>`;

var contextUndo =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.70711 4.70711C9.09763 4.31658 9.09763 3.68342 8.70711 3.29289C8.31658 2.90237 7.68342 2.90237 7.29289 3.29289L4.29289 6.29289C3.90237 6.68342 3.90237 7.31658 4.29289 7.70711L7.29289 10.7071C7.68342 11.0976 8.31658 11.0976 8.70711 10.7071C9.09763 10.3166 9.09763 9.68342 8.70711 9.29289L7.41421 8H11C12.6569 8 14 9.34315 14 11C14 12.6569 12.6568 14 11 14L7 14C6.44772 14 6 14.4477 6 15C6 15.5523 6.44771 16 7 16L11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6H7.41421L8.70711 4.70711Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2ZM2 1H18C18.5523 1 19 1.44772 19 2V18C19 18.5523 18.5523 19 18 19H2C1.44772 19 1 18.5523 1 18V2C1 1.44772 1.44772 1 2 1Z" fill="white"/>
        </svg>
    </div>
    <h2>Undo</h2>
    <div class="rcShortcut"><h2>Ctrl+Z</h2></div>
</div>`;

var contextRedo =
    `<div class="rcOption">
    <div class="rcIcon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2929 4.70711C10.9024 4.31658 10.9024 3.68342 11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L15.7071 6.29289C16.0976 6.68342 16.0976 7.31658 15.7071 7.70711L12.7071 10.7071C12.3166 11.0976 11.6834 11.0976 11.2929 10.7071C10.9024 10.3166 10.9024 9.68342 11.2929 9.29289L12.5858 8H9C7.34315 8 6 9.34315 6 11C6 12.6569 7.34315 14 9.00001 14L13 14C13.5523 14 14 14.4477 14 15C14 15.5523 13.5523 16 13 16L9.00001 16C6.23858 16 4 13.7614 4 11C4 8.23858 6.23858 6 9 6H12.5858L11.2929 4.70711Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 2C20 0.895431 19.1046 0 18 0H2C0.895432 0 0 0.895431 0 2V18C0 19.1046 0.89543 20 2 20H18C19.1046 20 20 19.1046 20 18V2ZM18 1H2C1.44772 1 1 1.44772 1 2V18C1 18.5523 1.44772 19 2 19H18C18.5523 19 19 18.5523 19 18V2C19 1.44772 18.5523 1 18 1Z" fill="white"/>
        </svg>
    </div>
    <h2>Redo</h2>
    <div class="rcShortcut"><h2>Ctrl+Shift+Z</h2></div>
</div>`;

var contextBGRemove =
    `<div class="rcOption">
    <div class="rcIcon">
        
    </div>
    <h2>Erase background</h2>
    <div class="rcShortcut"><h2>Ctrl+B</h2></div>
</div>`;



////////////////////////////////COMPILED CONTROLS/////////////////////////////

function righClickCanvas(e) {
    let rcCanvas = document.getElementById('rcCanvas');

    //reset rcCanvas content
    rcCanvas.innerHTML = "";

    rcCanvas.innerHTML = contextSelectAll + contextPaste + breakLineVerti + contextUndo
        + contextRedo + breakLineVerti + contextSave + contextDownload;

    rcCanvasAddFunction(e)
}

function righClickUpload(e) {

    let rcCanvas = document.getElementById('rcCanvas');
    let configScroll = document.getElementsByClassName('configScroll');

    //reset rcCanvas content
    rcCanvas.innerHTML = "";

    if (configScroll[5].childElementCount > 1) {
        if (multiSelect) {
            rcCanvas.innerHTML = contextSelectAll + contextClone + breakLineVerti
                + contextUndo + contextRedo + breakLineVerti + contextDelete;
        }
        else {

            rcCanvas.innerHTML = contextSelectAll + contextClone + breakLineVerti
                + contextUndo + contextRedo + breakLineVerti + contextArrangeLayer +
                breakLineVerti + contextDelete;
        }
    }
    else {
        rcCanvas.innerHTML = contextSelectAll + contextClone + breakLineVerti + contextBGRemove
        + breakLineVerti + contextUndo + contextRedo + breakLineVerti + contextDelete;
    }

    rcCanvasAddFunction(e);
}

function righClickElement(e) {

    let rcCanvas = document.getElementById('rcCanvas');
    let configScroll = document.getElementsByClassName('configScroll');

    //reset rcCanvas content
    rcCanvas.innerHTML = "";

    if (configScroll[5].childElementCount > 1) {
        if (multiSelect) {
            rcCanvas.innerHTML = contextSelectAll + contextClone
                + breakLineVerti + contextUndo + contextRedo + breakLineVerti + contextDelete;
        }
        else {

            rcCanvas.innerHTML = contextSelectAll + contextClone
                + breakLineVerti + contextUndo + contextRedo + breakLineVerti
                + contextArrangeLayer + breakLineVerti + contextDelete;
        }
    }
    else {
        rcCanvas.innerHTML = contextSelectAll + contextClone + breakLineVerti
            + contextUndo + contextRedo + breakLineVerti + contextDelete;
    }

    rcCanvasAddFunction(e);
}

function righClickText(e) {

    let rcCanvas = document.getElementById('rcCanvas');
    let configScroll = document.getElementsByClassName('configScroll');

    //reset rcCanvas content
    rcCanvas.innerHTML = "";

    if (configScroll[5].childElementCount > 1) {
        if (multiSelect) {
            rcCanvas.innerHTML = contextSelectAll + contextClone
                + breakLineVerti + contextUndo + contextRedo + breakLineVerti
                + contextEditText + breakLineVerti + contextDelete;
        }
        else {

            rcCanvas.innerHTML = contextSelectAll + contextClone
                + breakLineVerti + contextUndo + contextRedo + breakLineVerti
                + contextArrangeLayer + breakLineVerti +
                contextEditText + breakLineVerti + contextDelete;
        }
    }
    else {
        rcCanvas.innerHTML = contextSelectAll + contextClone
            + breakLineVerti + contextUndo + contextRedo + breakLineVerti
            + contextEditText + breakLineVerti + contextDelete;
    }

    rcCanvasAddFunction(e);
}

async function removeBackground(img, leadPanel) {

    try {
        const response = await fetch('https://rembg-7i89v.ondigitalocean.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: img.src }),
            timeout: 240000
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        let f = leadPanel.dataset.ref;
        let canvas = cnvGrpLayers.querySelector(`[data-ref="${f}"]`);
        let image = canvas.querySelector('img');
        canvas.style.visibility = "hidden";
        image.src = data.image;
        image.onload = function() {
            canvas.style.visibility = "visible";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the image.');
    }
}

function rcCanvasAddFunction(e) {

    let i = 0;
    ctrlAFocus = "workArea";
    let rcCanvas = document.getElementById('rcCanvas');
    let rcCanvas2 = document.getElementById('rcCanvas2');

    rcCanvas.querySelectorAll(`[class*='rcOption']`).forEach(opt => {

        let entry = opt.querySelector('h2').innerHTML;

        //USE 'ELECT' TO CHECK IF ENTRY IS SELECT ALL OR DESELECT
        if (entry.includes('elect')) {

            opt.addEventListener('click', function () {
                selectDeselectAll();
            });

            opt.addEventListener('contextmenu', function () {
                selectDeselectAll();
            });

        }
        else if (entry == "Save") {
            opt.addEventListener('click', function () {
                saveFile();

            });

            opt.addEventListener('contextmenu', function () {
                saveFile();
            });

        }
        else if (entry == "Download") {

            opt.addEventListener('click', function () {
                let btnDownload = document.getElementById('btnDownload');

                downloadFile.call(btnDownload);

            });

            opt.addEventListener('contextmenu', function () {
                let btnDownload = document.getElementById('btnDownload');

                downloadFile.call(btnDownload);
            });
        }
        else if (entry == "Position layer") {

            opt.addEventListener('pointerenter', function (e) {
                if (rcCanvas2.style.opacity == '0') {
                    hoverArrangeLayers(e, opt);
                }
            });

            opt.addEventListener('pointerenter', function () {
                if (rcCanvas2.style.opacity == '0') {
                    hoverArrangeLayers(e, opt);
                }

            });
        }
        else if (entry == "Clone") {

            opt.addEventListener('click', function () {
                cloneCanvas();
            });

            opt.addEventListener('contextmenu', function () {
                cloneCanvas();
            });

        }
        else if (entry == "Edit text") {

            opt.addEventListener('click', function () {
                editCanvasTextLayer(e);
            });

            opt.addEventListener('contextmenu', function () {
                editCanvasTextLayer(e);
            });

        }
        else if (entry == "Delete") {

            opt.addEventListener('click', function () {
                deleteObject();
            });

            opt.addEventListener('contextmenu', function () {
                deleteObject();
            });
        }
        else if (entry == "Undo") {

            opt.addEventListener('click', function () {
                undo();
            });

            opt.addEventListener('contextmenu', function () {
                undo();
            });
        }
        else if (entry == "Redo") {
            opt.addEventListener('click', function () {
                redo();
            });

            opt.addEventListener('contextmenu', function () {
                redo();
            });
        }
        else if(entry == "Erase background") {
            //POST THIS ON FLASK PYTHON
            opt.addEventListener('click', function(e) {
                let f = leadDrag.dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref='${f}']`);
                let img = canvas.querySelector('img');

                hideAllContextMenu()
                removeBackground(img, leadPanel)
                
            });

            opt.addEventListener('contextmenu', function(e) {
                let f = leadDrag.dataset.ref;
                let canvas = cnvGrpLayers.querySelector(`[data-ref='${f}']`);
                let img = canvas.querySelector('img');

                hideAllContextMenu()
                removeBackground(img, leadPanel)
            });

        }

        i++;

        if (i == rcCanvas.querySelectorAll(`[class*='rcOption']`).length) {
            formatContextMenu(e);
        }
    });
}

function formatContextMenu(e) {
    let i = 0;
    let rcCanvas = document.getElementById('rcCanvas');

    rcCanvas.querySelectorAll(`[class*='rcOption']`).forEach(opt => {

        let entry = opt.querySelector('h2');

        //USE 'ELECT' TO CHECK IF ENTRY IS SELECT ALL OR DESELECT
        if (entry.innerHTML.includes('elect')) {

            if (selectedAll) {
                entry.innerHTML = "Deselect all";
            }
            else {
                entry.innerHTML = "Select all";
            }
        }

        else if (entry == "Paste") {
            //console.log(entry);
        }
        else if (entry == "Save") {
            //console.log(entry);
        }
        else if (entry == "Download") {
            //console.log(entry);
        }

        i++;

        if (i == rcCanvas.querySelectorAll(`[class*='rcOption']`).length) {
            showContextMenu(e);
        }
    })
}

function showContextMenu(e) {

    let rcHeightPadding = 14;
    let rcCanvas = document.getElementById('rcCanvas');
    let rcCanvas2 = document.getElementById('rcCanvas2');
    let rcHeight = rcCanvas.clientHeight;
    let bodyBottom = document.body.getBoundingClientRect().bottom;

    resX = e.clientX;
    resY = e.clientY;
    rcCanvas.style.left = resX + 'px';

    rcCanvas.style.transition = '0s';
    rcCanvas.style.opacity = 0;

    rcCanvas2.style.transition = '0s';
    rcCanvas2.style.opacity = 0;

    //JUST ADD SOME '12' PIXELS FOR SPACING
    if (bodyBottom - resY - rcHeightPadding - 12 > rcHeight) {
        rcCanvas.style.top = resY + 'px';

        //CONDITION TO MAKE SURE THE LOCATION IS CORRECT
        //BEFORE SHOWING RCMASK
        if (rcCanvas.offsetLeft == resX && rcCanvas.offsetTop == resY) {
            rcCanvas.style.transition = '.2s';
            rcCanvas.style.opacity = 1;
        }
    }
    else {
        //JUST ADD SOME '12' PIXELS FOR SPACING
        rcCanvas.style.top = bodyBottom - rcHeight - rcHeightPadding - 12 + 'px';

        //CONDITION TO MAKE SURE THE LOCATION IS CORRECT
        //BEFORE SHOWING RCMASK
        if (rcCanvas.offsetLeft == resX && rcCanvas.offsetTop == bodyBottom - rcHeight - rcHeightPadding - 12) {
            rcCanvas.style.transition = '.2s';
            rcCanvas.style.opacity = 1;
        }
    }
}

//////////////////////////////RIGHT CLICK ON WORKAREA/////////////////////////

function rightClick(e) {

    /////////////////////IF RIGHT CLICKING ON BLANK//////////////////////
    if(e.button == 2) {
        if (e.target.id == "cnvPin") {

            e.preventDefault();

            ////////////////////CHECK IF RCCANVAS IS LOADED///////////////////
            righClickCanvas(e);

        }
        else if (e.target.closest('.pinBody')) {

            e.preventDefault();

            let type = e.target.closest('.pinBody').dataset.type;

            linkCanvasWithPanelLayer(null, e.target.closest('.pinBody'))

            ////////////////////CHECK IF RCCANVAS IS LOADED////////////////////
            if (type == "image") righClickUpload(e);

            else if (type == "vector") righClickUpload(e);

            else if (type == "element") righClickElement(e);

            else if (type == "text") righClickText(e);

        }
        else if (e.target.closest(`[class*='rcOption']`)) {
            e.preventDefault();
            hideAllContextMenu();
        }
        else if (e.target.closest('#pnlBoxEmojiSymbol')) {
            e.preventDefault();
        }
        else {
            hideAllContextMenu();
            resetAllFocus();
        }
    }
}
document.addEventListener('contextmenu', rightClick);

//////////////////////////////RIGHT CLICK CANVAS 2///////////////////////////

function hoverArrangeLayers(e, opt) {
    let rcCanvas2 = document.getElementById('rcCanvas2');

    //reset rcCanvas content
    rcCanvas2.innerHTML = "";

    rcCanvas2.innerHTML = contextLayerTop + breakLineVerti + contextLayerUp
        + contextLayerDown + breakLineVerti + contextLayerBottom;

    rcCanvas2AddFunction(e, opt)
}

function rcCanvas2AddFunction(e, opt2) {

    let i = 0;
    ctrlAFocus = "workArea";
    let rcCanvas2 = document.getElementById('rcCanvas2');

    rcCanvas2.querySelectorAll(`[class*='rcOption']`).forEach(opt => {

        let entry = opt.querySelector('h2').innerHTML;

        //USE 'ELECT' TO CHECK IF ENTRY IS SELECT ALL OR DESELECT
        if (entry == "Move to top") {

            opt.addEventListener('click', function () {
                contextMoveLayer('top');
            });

            opt.addEventListener('contextmenu', function () {
                contextMoveLayer('top');
            });
        }

        else if (entry == "Move up") {
            opt.addEventListener('click', function () {

                contextMoveLayer('up');
            });

            opt.addEventListener('contextmenu', function () {
                contextMoveLayer('up');
            });
        }

        else if (entry == "Move down") {
            opt.addEventListener('click', function () {

                contextMoveLayer('down');
            });

            opt.addEventListener('contextmenu', function () {

                contextMoveLayer('down');
            });
        }
        else if (entry == "Move to bottom") {

            opt.addEventListener('click', function () {

                contextMoveLayer('bottom');
            });

            opt.addEventListener('contextmenu', function () {
                contextMoveLayer('bottom');
            });
        }

        i++;

        if (i == rcCanvas2.querySelectorAll(`[class*='rcOption']`).length) {
            showContextMenu2(e, opt2);
        }
    });
}

function showContextMenu2(e, opt) {

    let rcCanvas = document.getElementById('rcCanvas');
    let rcCanvas2 = document.getElementById('rcCanvas2');
    let rcHeight = rcCanvas2.clientHeight;
    let bodyBottom = document.body.getBoundingClientRect().bottom;

    hideContextMenu2();

    rcCanvas2.style.left = rcCanvas.getBoundingClientRect().right - 1 + 'px';

    //CHECK FIRST IF OPT HAS VERTILINE BEFORE
    if (opt.previousElementSibling.className == "breaklineVerti") {
        let line = Math.round(opt.previousElementSibling.getBoundingClientRect().top);

        //////////////CHECK FIRST IF BOTTOM SPACE IS ENOUGH///////////
        if ((bodyBottom - line) >= rcHeight) {
            rcCanvas2.style.top = line + 'px';

            if (rcCanvas2.getBoundingClientRect().top == line) {
                rcCanvas2.style.transition = '.2s';
                rcCanvas2.style.opacity = 1;
            }
        }
        ////////////IF NOT, ADJUST THE TOP OF RCCANVAS2//////////////
        else {

            //CHECK IF THERE'S ANOTHER VERTILINE AFTER
            if (opt.nextElementSibling.className == "breaklineVerti") {
                line = Math.round(opt.nextElementSibling.getBoundingClientRect().bottom);

                rcCanvas2.style.top = line - rcHeight + 'px';

                if (rcCanvas2.getBoundingClientRect().top == line - rcHeight) {
                    rcCanvas2.style.transition = '.2s';
                    rcCanvas2.style.opacity = 1;
                }
            }

        }

    }
    else {
        rcCanvas2.style.top = opt.getBoundingClientRect().top + 'px';

        if (rcCanvas2.getBoundingClientRect().top == opt.getBoundingClientRect().top) {
            rcCanvas2.style.transition = '.2s';
            rcCanvas2.style.opacity = 1;
        }
    }
}

///////////////////////////////////HIDE ALL RIGHT CLICK MENU///////////////////////
function hideAllContextMenu() {
    let rcCanvas = document.getElementById('rcCanvas');
    let rcCanvas2 = document.getElementById('rcCanvas2');

    rcCanvas.style.transition = '0s';
    rcCanvas.style.opacity = 0;
    rcCanvas.style.left = '100vw';

    rcCanvas2.style.transition = '0.2s';
    rcCanvas2.style.opacity = 0;

    rcCanvas2.style.transition = '0s';
    rcCanvas2.style.left = '100vw';
}

function hideContextMenu2() {
    let rcCanvas2 = document.getElementById('rcCanvas2');

    rcCanvas2.style.transition = '0.2s';
    rcCanvas2.style.opacity = 0;

    rcCanvas2.style.transition = '0s';
    rcCanvas2.style.left = '100vw';
}

document.getElementById('cnvPin').addEventListener('pointerenter', hideContextMenu2)

//////////////////////THIS WILL HIDE RCCANVAS2 WHEN LEFT RCOPTIONEXT OR RCCANVAS2
document.addEventListener('pointermove', function (e) {
    if (e.target.closest('.rcOptionExt') || e.target.closest('#rcCanvas2')) {

    }
    else {
        hideContextMenu2();
    }

})