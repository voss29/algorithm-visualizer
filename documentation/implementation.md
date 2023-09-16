# **Implementation Algorithm Visualizer**
<br>
<br>

## **Table Of Contents**
<br>

- [**Implementation Algorithm Visualizer**](#implementation-algorithm-visualizer)
  - [**Table Of Contents**](#table-of-contents)
  - [**Requirements**](#requirements)
  - [**Application Flow**](#application-flow)
  - [**Wireframes**](#wireframes)
    - [**Mobile**](#mobile)
      - [**Landing Page**](#landing-page)
      - [**Menu**](#menu)
      - [**Algorithm Description**](#algorithm-description)
      - [**Algorithm Execution**](#algorithm-execution)

<br>
<br>
<br>

## **Requirements**

* [Requirements Algorithm Visualizer](./requirements.md)

<br>
<br>
<br>

## **Application Flow**
<br>

```mermaid
stateDiagram-v2
  direction LR

  state app {
    direction LR


    state menu {
      direction LR

      a1 : select option
      b1 : toggle algorithm family options
      c1 : toggle algorithm options
      d1 : display algorithm type description
      e1 : display algorithm family description

      state choice1 <<choice>>

      [*] --> a1
      a1 --> choice1
      choice1 --> b1: [algorithm type selected]
      choice1 --> c1: [algorithm family selected]
      choice1 --> [*]: [algorithm selected]
      b1 --> d1
      c1 --> e1
      d1 --> a1
      e1 --> a1
    }

    
    state visualization {
      direction TB

      a2: visualize result
      

      state algorithmDescription {
        direction LR

        a3: describe core idea
        b3: describe input data
        c3: generate input data
        d3: visualize input data
        e3: describe output data
        f3: visualize output data
        g3: execute algorithm

        state fork1 <<fork>>
        state fork2 <<fork>>
        state join1 <<join>>
        state join2 <<join>>

        [*] --> fork1
        fork1 --> b3
        fork1 --> c3
        fork1 --> d3
        b3 --> join1
        c3 --> join1
        d3 --> join1
        join1 --> a3
        a3 --> fork2
        fork2 --> e3
        fork2 --> f3
        e3 --> join2
        f3 --> join2
        join2 --> g3
        g3 --> [*]
      }


      state algorithmExecution {
        direction TB

        state choice2 <<choice>>
        state choice3 <<choice>>


        state algorithmStage {
          direction LR

          a4: describe algorithm stage
          b4: visualize data structure

          state fork3 <<fork>>
          state join3 <<join>>

          [*] --> fork3
          fork3 --> a4
          fork3 --> b4
          a4 --> join3
          b4 --> join3
          join3 --> [*]
        }


        state algorithmStep {
          direction LR

          a5: execute algorithm step
          b5: highlight changes of executed step
          c5: describe execution step

          [*] --> a5
          a5 --> b5
          b5 --> c5
          c5 --> [*]
        }


        [*] --> algorithmStage
        algorithmStage --> algorithmStep
        algorithmStep --> choice2
        choice2 --> algorithmStep: [stage not completed]
        choice2 --> choice3: [stage completed]
        choice3 --> algorithmStage: [algorithm not terminated]
        choice3 --> [*]: [algorithm terminated]

      }


      [*] --> algorithmDescription
      algorithmDescription --> algorithmExecution
      algorithmExecution --> a2
      a2 --> [*]
      
    }

    [*] --> menu
    menu --> visualization
    visualization --> menu

  }

  [*] --> app
  app --> [*]
```

<br>
<br>
<br>

## **Wireframes**
<br>
<br>

### **Mobile**
<br>
<br>

#### **Landing Page**

![Image](./images/wireframes/mobile/LandingPage.png)

<br>
<br>

#### **Menu**

![Image](./images/wireframes/mobile/menuTopCategory.png)
![Image](./images/wireframes/mobile/menuSubCategory.png)
![Image](./images/wireframes/mobile/menuSelection.png)

<br>
<br>

#### **Algorithm Description**

![Image](./images/wireframes/mobile/algorithmDescriptionInputData.png)
![Image](./images/wireframes/mobile/algorithmDescriptionCoreIdea.png)
![Image](./images/wireframes/mobile/algorithmDescriptionOutputData.png)

<br>
<br>

#### **Algorithm Execution**

![Image](./images/wireframes/mobile/algorithmExecution.png)