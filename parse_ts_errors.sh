 #!/bin/zsh

 # Parse TypeScript errors from docs/type_errors.log using macOS grep
 # -P enables Perl-compatible regex (PCRE)
 # -o shows only matching parts
 # -z treats the whole file as one line

 if [[ ! -f "docs/type_errors.log" ]]; then
   echo "Error: docs/type_errors.log not found"
   exit 1
 fi

 # Extract error messages
 echo "TypeScript Errors:"
 grep -Pzo '(?s)error TS\d+:.*?(?=\n\S|$)' docs/type_errors.log

 # Extract file paths
 echo -e "\nAffected Files:"
 grep -Po '^[^\s:]+(?=:\d+:\d+ - error)' docs/type_errors.log | sort | uniq

 # Count total errors
 total_errors=$(grep -Pc '^[^\s:]+:\d+:\d+ - error' docs/type_errors.log)
 echo -e "\nTotal Errors Found: $total_errors"