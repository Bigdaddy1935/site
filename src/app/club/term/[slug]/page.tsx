import Container from "@/components/Assets/Container";
import ClubProvider from "@/components/Routes/Club/ClubCategories/ClubCategoreisContext";
import ClubCategories from "@/components/Routes/Club/ClubCategories/ClubCategories";

export default function TermPage() {
  return (
    <Container className="py-8">
      <ClubProvider>
        <ClubCategories />
      </ClubProvider>
    </Container>
  );
}
