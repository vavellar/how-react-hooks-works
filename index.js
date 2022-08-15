const myReact = (() => {
    let hooks = []

    let index = 0

    const useState = (initialValue) => {
        const localIndex = index
        index++

        if (hooks[localIndex] === undefined) {
            hooks[localIndex] = initialValue
        }

        const setterFunction = (newValue) => {
            hooks[localIndex] = newValue
        }

        return [ hooks[localIndex], setterFunction]
    }

    const useEffect = (callback, dependencyArray) => {
        let hasChanged = true

        const oldDependencies = hooks[index]

        if (oldDependencies) {
            hasChanged = false
            
            dependencyArray.forEach((dependency, index) => {
                const oldDependency = oldDependencies[index]
                const areTheSame = Object.is(dependency, oldDependency)

                if (!areTheSame ) {
                    hasChanged = true
                }
            })
        }

        if (hasChanged) {
            callback()
        }

        hooks[index] = dependencyArray
        index++
    }

    const resetIndex = () => {
        index = 0
    }

    return { useState, resetIndex, useEffect }
})

const { useState, resetIndex, useEffect } = myReact()

const ComponentOne = () => {
    const [counterValue, setCounterValue ] = useState(1)
    const [name, setName] = useState("Victor")
    
    console.log(counterValue)
    console.log(name)

    useEffect(() => {
        console.log("useEffect")
    }, [name])
    
    if (counterValue !== 2) {
        setCounterValue(2)
    }

    if (name !== "Jack" && counterValue === 2) {
        setName("Jack")
    }
}

ComponentOne()
resetIndex()
ComponentOne()
resetIndex()
ComponentOne()
