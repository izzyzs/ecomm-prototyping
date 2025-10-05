// import React from "react";
// import { Button } from "@/components/ui/button";

// const GrantPermissions = () => {
//     const handleClick = () => {
//         window.location.href =
//     };

//     return (
//         <div className="h-[100vh] flex flex-col content-center">
//             <Button className="m-auto" onClick={handleClick}>
//                 Grant us Lightspeed permissions!
//             </Button>
//         </div>
//     );
// };

// export default GrantPermissions;

// https://cloud.lightspeedapp.com/auth/oauth/authorize?response_type=code&client_id=050805b14f5c31ea9d26a033df238ad046fd5e79f5c068aa8467a7c6c90c2191&scope=employee:all&state=a4a21e1d64d6fd88e481dcf805095e8662c0558e4f8d8948b01e56a620f922d9

// curl -F 'client_id=050805b14f5c31ea9d26a033df238ad046fd5e79f5c068aa8467a7c6c90c2191' \
// -F 'client_secret=88d43ff728d8f80b8d3b549e2c542a3381cdaa3d9d8ede301ae9f0616a747421' \
// -F 'code=def50200caa5692c9b9acab6ceae6fce3a81fc62dbfbb52980b6e189b2bfd94ba5b70d1f675de742e59cb81a77fc03ce7d96fa0670364917dd65a591e7e49b06c489d435fc5ad15e541f53446a3c3115e87dcb208819892422857098e5e7af65ca35f8fb54527478c04779868ad70003ea84ddabbe2db593fc25897b4030c090441e990596b3b2b6f4a3398f4f26645ff6a44f3838d0449524514dc12109fdd74b3ef04b338e5e57f5115a12e60af9691a34b12d9fb96b6d597a4278d09639a8c1337e460bdb6ff2bf4d9ead574dc7fa4b892f6578bbdc21bf4e1317ca424dd82961245f001fe4667e8a3ce53a33cac4ace0f5bbdddaaca82c21da9c839be1c8f898d13ce74c149e80bc1e952c333183640e20f33129ac6699690d76bf1cc5ae07ad65f92f239f13e1d7e1892e560ce492ce193a727cad67efb7974bfd60687270bf3618d3349049540e77fb5f3c22b951ead9f059d3c1aa7a1934c8f28154584057ed4257c9688246c0159c177b0e515966bcff8ed82c488743f66dcae6e06b915cbde248605e53b0febc5397c9af2a82653f6c' \
// -F 'grant_type=authorization_code' \
// https://cloud.lightspeedapp.com/auth/oauth/token
