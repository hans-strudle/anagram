pub trait Anagram {
    fn is_anagram_of(&self, cmp: &str) -> bool;
    fn anagram_bits(&self) -> Vec<u8>;
    fn compare_to(&self, cmp: &str) -> bool;
}

impl Anagram for String {
    fn compare_to(&self, cmp: &str) -> bool {
        let l = self.to_lowercase();
        let left = l.chars();
        let r = cmp.to_lowercase();
        let mut right = r.chars();
        for l in left {
            let p = right.position(|s| -> bool {
                s == l
            });
            println!("{l} : {p:?}");
            match p {
                Some(p) => {
                    // println!("{p}")
                    continue
                },
                None => return false
            }
        }
        false
    }
    fn anagram_bits(&self) -> Vec<u8> {
        let mut b = Vec::new();
        for c in self.to_lowercase().chars() {
            b.push(c as u8)
        }
        b
    }
    fn is_anagram_of(&self, cmp: &str) -> bool {
        if self.len() != cmp.len() {
            return false;
        }
        let mut c: Vec<char> = cmp.to_lowercase().chars().collect();
        let mut s: Vec<char> = self.clone().to_lowercase().chars().collect();
        c.sort();
        s.sort();
        if c == s {
            return true
        }
        false
    }
}
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bits() {
        let s = String::from("reward"); // drawer

        let bits = s.anagram_bits();
        println!("bits: {bits:?}");
    }
    #[test]
    fn test_compare() {
        let s = String::from("reward");

        s.compare_to("reward");
        s.compare_to("test");
        s.compare_to("drawer");
    }
}

