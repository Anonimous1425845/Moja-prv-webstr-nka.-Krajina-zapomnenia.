const mapovanieSK = [
    "Január",
    "Február",
    "Marec",
    "Apríl",
    "Máj",
    "Jún",
    "Júl",
    "August",
    "September",
    "Október",
    "November",
    "December"
]

const mappingEN = [
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    "Mpty 4 now",
    
]

function FindMoon(Lang,mesiac) {
    if (Lang == 'SK') {
        return mapovanieSK[mesiac - 1];
    }
}