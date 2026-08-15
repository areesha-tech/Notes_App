import {useEffect, useState} from 'react'
import {File} from 'lucide-react'
function Notes() {
  const [notes,setNotes]=useState(()=>{
  return JSON.parse(localStorage.getItem("notes")) || []
  })
  console.log(notes)
  const[isSave,setIsSave]=useState(false)
  const handleClick=()=>{
  setNotes((prev) => [...prev,{text: "",isSave:false}]);
  }
  const dlt=(index)=>{
 let newNotes= notes.filter((_,i)=>index!==i)
 setNotes(newNotes)
  }
  const handleChange=(e,index)=>{
    let value=e.target.value;
   let updatedArray=notes.map((item,pos)=>index==pos? {...item,text:value} : item)
   setNotes(updatedArray)
  }
  const save=(position)=>{
   let newArray=notes.map((item,index)=>index===position? {...item,isSave:true} : item)
   setNotes(newArray)
  }
   useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

 return (
  <>
   <div className="min-h-screen w-full mx-auto bg-[#FFF4BF] py-3  px-4">

  {/* Header */}
  <div className="flex flex-col items-center gap-12">
  <div className="flex  flex-col items-center gap-2 mt-7 py-3 mb-7 ">
    <span className="text-gray-400 font-medium sm:text-[14px] md:text-[16px] capitalize">personal journal</span>
    <h1 className="font-serif text-4xl font-bold text-[#133458] ">
      My Notes
    </h1>
<hr className="text-gray-500 w-15 font-bold h-1.5"></hr>
    <button
      onClick={handleClick}
      className="inline-flex justify-center cursor-pointer rounded-3xl px-6 py-3 bg-[#133458] text-base font-semibold  text-white shadow-sm transition hover:bg-[#0e2843]"
    >
      + Add Notes
    </button>
  </div>
{/*empty*/}
{notes.length==0 && <div className="border-2 border-dashed border-gray-400 flex flex-col items-center text-gray-500 rounded-2xl py-20 px-3  sm:w-120 gap-3 ">
    <File size={48} color="gray" strokeWidth={2} />
    <p>No notes yet - start write something down</p>
  </div>}
  </div>
  {/* Notes Grid */}
  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,450px))] gap-6 justify-center ">

    {
     notes.map((item, index) => (
      <div
        key={index}
        className="min-h-[240px]  flex flex-col justify-between rounded-xl bg-[#FBF3E3] p-3 shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
      >

        {item.isSave? (
          <>
             {/* Note Text */}
            <p className="wrap-break-word whitespace-pre-wrap font-serif text-[1.05rem] leading-7 text-[#403d38]">
              {item.text}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3 border-t border-[#ebe6dd] pt-4">
              <button
                onClick={() => dlt(index)}
                className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white "
              >
                Delete
              </button>

            </div>
        
           
          </>
        ) : (
          <>
           {/*textarea*/}
           <textarea
              autoFocus
              className=" resize-none  p-2 font-serif text-[1.05rem] leading-7 text-[#403d38] outline-none placeholder:text-[#aaa399]"
              placeholder="Write your notes here..."
              value={item.text}
              onChange={(e) =>handleChange(e,index)}
            />

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-3 border-t border-[#ebe6dd] pt-4">

              <button
                onClick={()=>save(index)}
                className="cursor-pointer rounded-lg bg-[#0A2947] px-5 py-2 text-sm font-semibold text-white "
              >
                Save
              </button>

              <button
                onClick={() => dlt(index)}
                className="cursor-pointer rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>

            </div>
          
          
          </>
        )}
      
      </div>
    )
)}   
  </div>
</div>
</>
);
}
export default Notes;