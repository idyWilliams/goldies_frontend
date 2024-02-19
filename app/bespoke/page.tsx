import Header from "@/components/Header";
import Image from "next/image";
import BespokeImg from "../../public/assets/large.jpeg";
import Footer from "@/components/Footer";
import TypeForm from "@/components/TypeForm";

/* 
1
Cake Occasion This question is required.*
A
Wedding
B
Baby Shower
C
Bridal Shower
D
Anniverssary
E
Theme Party
2
Bespoke Order Item?
A
Wedding Cake
B
Cupcakes
C
Naked Cake
D
Semi -Naked Cake

3
Cake Flavour?
A
Vanilla and Chocolate
B
Strawberry and cream
C
Goldis Special Flavours
D
Custom Flavours

4
Cake Size?
A
6"inches
B
10"inches
C
18"inches
D
Custom size

5
Cake Tier?
A
2 tiers
B
3 tiers
C
4 tiers
D
Other

6
Cake Colours?
Type your answer here...(input field)

7
Cake Design Description?
Type your answer here... (input field)

8
Image Inspiration?
Upload pictures for clarity on design
Max.file size: 60MB

9
When do you need it ready?
Month
MM
/
Day
DD
/
Year
YYYY

Please fill your contact details


First name
Jane
Last name
Smith
Phone number

(201) 555-0123
Email
name@example.com
Company
Acme Corporation

Submit









*/

const BespokePage = () => {
  return (
    <>
      <Header />
      <section className="bg-black py-16 pt-24">
        <div className="wrapper">
          <h2 className="mb-2 text-2xl font-bold capitalize text-main md:text-center md:text-3xl">
            Let&apos;s Create your cake
          </h2>

          <div className="">
            <p className="mb-8 text-main md:mx-auto md:w-8/12 md:text-center md:text-xl md:leading-[155%]">
              <strong>
                A personalized cake is a unique and special addition to any
                event.
              </strong>
              It adds value and significance to your occasion when displayed as
              a centerpiece. Our aim is to design a stunning cake that not only
              looks great but also tastes delicious.
            </p>
            <TypeForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BespokePage;
