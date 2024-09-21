use std::fs;
use std::io;
use std::collections::HashMap;
use std::io::prelude::*;

mod anagram;
use anagram::Anagram;

fn main() -> io::Result<()>{
    // let dict_path = "/usr/share/dict/web2";
    // let dict_path = "1000words.txt";
    let dict_path = "popular.txt";
    let out_path = "anagrams.csv";
    // let f = fs::File::open(dict_path)?;
    // let list = f.read_bytes();
    let content = fs::read_to_string(dict_path)?;
    let mut anagrams: HashMap<String, Vec<String>> = HashMap::new();
    for line in content.lines() {
        // skip < 3 or > 8
        if line.len() < 3 || line.len() > 8 {
            continue;
        }
        for (key, value) in anagrams.clone().into_iter() {
            let l = String::from(key);
            if l.is_anagram_of(line) {
                // println!("{l} : {line}");

                // anagrams.insert(line, vec![l]);
                anagrams.entry(line.to_string())
                    .or_insert_with(Vec::new)
                    .push(l)

            }
        }
        anagrams.entry(line.to_string()).or_insert_with(Vec::new);
    }
    let mut list = Vec::new();
    for (key, value) in anagrams.into_iter() {
        if value.len() > 0 {
            let mut out = String::new();
            out = out + &key + ",";
            out.push_str(&value.join(","));
            out.push_str("\n");
            list.push(out);
        }
    }

    list.sort();

    println!("{}", list.join(""));
    Ok(())
}
