// "use client";
// import React, { useState } from 'react';

// export default function LinkInputList() {
//     // 링크 인풋들의 상태를 관리하는 배열
//     const [inputs, setInputs] = useState(['']);

//     // 새 인풋을 추가하는 함수
//     const addInput = () => {
//         setInputs([...inputs, '']);
//     };

//     // 기존 인풋의 값이 바뀔 때 상태를 갱신하는 함수
//     const updateInput = (value, index) => {
//         const updatedInputs = inputs.slice(); // 현재 상태의 복사본 생성
//         updatedInputs[index] = value; // 해당 인덱스의 값을 갱신
//         setInputs(updatedInputs); // 상태를 갱신
//     };

//     return (
//         <div style={{ paddingTop: 200, fontSize: 60 }}>
//             <button onClick={addInput}>링크 추가</button>
//             {inputs.map((input, index) => (
//                 <input
//                     key={index}
//                     type="text"
//                     value={input}
//                     onChange={(e) => updateInput(e.target.value, index)}
//                     placeholder={`링크 ${index + 1}`}
//                 />
//             ))}
//         </div>
//     );
// };
