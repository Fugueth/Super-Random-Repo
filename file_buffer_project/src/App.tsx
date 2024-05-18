import { useState } from "react";
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { clsx } from 'clsx';

export default function App(): any {
  const [loadingContents, setLoadingContents] = useState(false)
  const [fileChosen, setFileChosen] = useState<null | string>(null)
  const [fileChosenType, setFileChosenType] = useState<null | string>("NADA")
  const [bufferText, setBufferText] = useState<string>("")
  const [bufferTextBytesTotal, setBufferTextBytesTotal] = useState<string>("")
  const [bufferTextBytes, setBufferTextBytes] = useState<string>("NENHUM INFORMADO")

  const reset = () => {
    setFileChosen(null)
    setBufferText("")
  }

  const selectFile = async () => {
    let selected = await open({
      multiple: false,
      
    });
    if (selected === null) {
      console.log("NAY !")
    } else {
      setLoadingContents(true)
      let list_splitted = String(selected).split('\\')
      let achive_file = list_splitted[list_splitted.length - 1]
      if (String(achive_file).split('.')[String(achive_file).split('\\').length -1]) {
        let file_type = String(achive_file).split('.')[String(achive_file).split('.').length -1]
        console.log(achive_file, file_type)
        setFileChosenType(String(file_type).toUpperCase())
        setFileChosen(file_type == "txt" ? `${String(achive_file).split('.')[0]}.${file_type}` : achive_file)
      } else {
        setFileChosenType("SEM EXT.")
        setFileChosen(achive_file)
      }
      
      console.log(selected, list_splitted[list_splitted.length - 1])
      let contents = await readBinaryFile(selected);
      if (Number(contents.length) >= 1) {
        setBufferText(contents.join(" "))
        setBufferTextBytes(`${Number(contents.length * (0.00000095367432)).toFixed(2)} Megabytes`)
        setBufferTextBytesTotal(`${contents.length} Bytes no total`)
      } else {
        setBufferText("SEM CONTEÚDO")
        setBufferTextBytes("NENHUM INFORMADO")
      }
      setLoadingContents(false)
    }
  }

  return (
    <div className="flex w-screen h-screen flex-col gap-2 justify-center items-center">
      <div className="flex max-w-96 mx-auto w-full gap-2 justify-start items-center">
        <button className="btn btn-primary text-white" onClick={selectFile}>
         Escolher arquivo
        </button>
        {
          fileChosen && (
            <div className="flex text-nowrap overflow-hidden border-2 border-primary w-full h-full text-center items-center px-3">
              <p className="text-ellipsis text-nowrap overflow-hidden text-primary">
                {fileChosen ? fileChosen : "Escolher arquivo teste"}
              </p>
            </div>
            
          )
        }
        <div className="tooltip tooltip-right tooltip-primary" data-tip="Remover seleção de arquivo">
          <button className="btn btn-primary btn-square" onClick={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x">
              <circle cx="12" cy="12" r="10"/>
              <path d="m15 9-6 6"/>
              <path d="m9 9 6 6"/>
            </svg>
          </button>
        </div>
      </div>
      <div className={
        clsx({
          "flex w-96 h-96 p-4 border-2 border-primary overflow-hidden overflow-y-scroll buffer-text-box": true,
          "justify-start": !loadingContents,
          "items-start": !loadingContents,
          "justify-center": loadingContents,
          "items-center": loadingContents,
        }
      )}>
        {
          !loadingContents ? (
            <p className="text-primary text-sm text-wrap">{bufferText}</p>
          ) : (
            <span className="loading loading-dots loading-md text-primary"></span>
          )
        }
      </div>
      <div className="flex w-96 p-2 px-3 justify-between items-start overflow-hidden">
        <p className="text-primary text-sm">
          <strong>TAMANHO APROX .:</strong> <span className="underline">{bufferTextBytes}</span>
        </p>
        <p className="text-primary font-bold text-sm">
          {fileChosenType}
        </p>
      </div>
    </div>
  );
}

